import { reactText, reactElement } from './react';
import diff from './diff';

const EVENTS = ['onClick'];
/**
 * @param {*} tree 
 * @param {*} container 
 * @param {*} cb 
 */
function render(tree, container, cb) {
    const node = createNode(tree);
    container.appendChild(node);
}



// 创建节点 元素 字符串 组件
function createNode(vnode) {
    let node;
    // 元素
    if (vnode.$$type === reactElement) {

        if (typeof vnode.type === 'string') {

            node = document.createElement(vnode.type);
            // 创建属性
            createProps(node, vnode.props);
            // 创建子节点
            createChildren(node, vnode.children);
        } else {
            if (vnode.type.isReactComponent) {
                node = createCmp(vnode);
            }
        }
    } else if (vnode.$$type === reactText) {
        node = document.createTextNode(vnode.inner);
    }
    vnode.dom = node;
    return node;
}

// 创建组件
function createCmp(vCmp) {
    let Cmp = new vCmp.type(vCmp.props);
    // 生命周期
    let nextState = stateFromProps(vCmp, vCmp.props, Cmp.state);
    if (nextState) {
        Object.assign(Cmp.state || {}, nextState);
    }
    let vnode = Cmp.render();
    let node = createNode(vnode);
    //更新组件
    vCmp.Cmp = Cmp;
    Cmp.updater = (nextProps, nextState) => {
        //Object.assign(nextState,stateFromProps(vCmp,nextProps,nextState));
        // SCU
        let prevProps = Cmp.props;
        let prevState = Cmp.state;
        Cmp.props = nextProps;
        Cmp.state = nextState;

        //调用 render 生成新的 虚拟DOM；
        let newVNode = Cmp.render();
        // getSnapshotBeforeUpdate 
        vnode = diff(vnode, newVNode, createNode);
        return vCmp;
    };
    setTimeout(() => {
        batchUpdate(Cmp, didMount, [Cmp]);
    })
    return node;
}
// 批处理
function batchUpdate(Cmp, fn, args, $this) {
    Cmp.isBatchUpdate = true;   // 批处理开启
    Cmp.nextStates = [];        // 任务队列
    fn.apply($this, args);       // 执行
    Cmp.isBatchUpdate = false;  // 批处理关闭
    // 合并状态值
    let nextState = Object.assign({}, Cmp.state);

    Cmp.nextStates.forEach(state => {
        Object.assign(nextState, state); //合并任务队列中的状态
    })
    // 有变化时更新
    if (nextState.length > 0) {

        // 更新组件 
        Cmp.updater(Cmp.props, nextState);  // 此方法在 创建组件node时 声明
    }

}
// class 组件 props 映射 到 state
function stateFromProps(cmp, props, state) {
    // 判断当前是否存在此方法
    return cmp.type.getDerivedStateFromProps ? cmp.type.getDerivedStateFromProps(props, state) : {}
}


// class 组件 ComponentDidMount
function didMount(cmp) {
    if (cmp.componentDidMount) {
        cmp.componentDidMount();
    }
}

// 创建属性
function createProps(node, props) {
    for (let p in props) {
        // 样式
        if (p === 'style') {
            for (let st in props['style']) {
                node["style"][st] = props["style"][st];
            }
        } else if (EVENTS.includes(p)) {
            // 绑定事件
            node[p.toLocaleLowerCase()] = props[p];//改变指针
        } else {
            node[p] = props[p];
        }
    }

    // 事件
}

// 创建子节点
function createChildren(parent, children) {
    children.forEach(ele => {
        render(ele, parent);
    });
}

const ReactDOM = {
    render
}
export default ReactDOM;