import { reactText, reactElement } from "./react";

function diff(oldTree, newTree) {
    diffNode(oldTree, newTree)
}

// diff节点
function diffNode(oldNode, newNode) {
    if (oldNode.type !== newNode.type) {
        // 判断类型 - 不同替换
    } else if (oldNode.$$type === reactText) {
        // 判断文本 - 不同替换
        if (oldNode.inner !== newNode.inner) {
            // 更新文本内容
        }
    } else if (oldNode.$$type === reactElement) {
        // 组件 ？
        if (oldNode.type.isReactComponent) {
            // 更新子组件
            updateCmp(oldNode, newNode);
        } else {
            // 对比 props
            diffProps(oldNode.props, newNode.props);
            // 递归子级
            diffChildren(oldNode.children, newNode.children);
        }
    } else {
        console.error('diff异常！')
    }
}

// diff属性
function diffProps(oldProps = {}, newProps = {}) {
    for (let k in newProps) {
        if (typeof newProps[k] === 'object') {
            diffProps(oldProps[k], newProps[k])
        } else if (k in oldProps) {
            if (oldProps[k] !== newProps[k]) {
                console.log(k, '属性值有变化')
            }
        } else {
            console.log(k, '新增属性')
        }
    }

    for (let k in oldProps) {
        if (!(k in newProps)) {
            console.log(k, '删除属性')
        }
    }
}
// diff子组件
// 触发情况 新增 删除 移动 
// 对比优化 将数组 装换成 对象来进行对比 {k:{},v:{}}
function diffChildren(oldChildren, newChildren) {
    // console.log(oldChildren, newChildren)  // 两个数组 不易于对比

    let oldChild = getKeys(oldChildren);
    let newChild = getKeys(newChildren);

    let lastIndex = 0; // 标识 上一位 索引位置
    for (let k in newChild) {
        if (oldChild[k]) {
            // 新 旧 节点都存在 进行深层次比对
            diffNode(oldChild[k], newChild[k]);

            if (lastIndex > oldChild[k].index) {
                // 位置发生变化
            } else {
                // 位置没有变化
                lastIndex = oldChild[k].index;
            }
        } else {
            // 新增 节点
        }
    }

    for (let k in oldChild) {
        if (!newChild[k]) {
            // 老节点被删除
            console.log(oldChild[k],"被删除了");
        }
    }
}
function getKeys(child) {
    let keys = {};
    child.forEach((item, index) => {
      let { key } = item;
      key = key !== undefined ? key : "RC" + index;
    //   key = key;
      keys[key] = item;
      keys[key].index = index; // 记录 index 便于 对 元素顺序的比对
    });
    return keys
  }
// 更新组件
function updateCmp(oldCmp, newCmp) {
    //更新子组件
    oldCmp.props = oldCmp.props;
    return oldCmp.Cmp.updater(newCmp.props, oldCmp.Cmp.state);

}
export default diff;