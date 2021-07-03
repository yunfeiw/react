import { reactText, reactElement } from "./react";
import patch from "./patch";

function diff(oldTree, newTree, createNode) {
    return diffNode(oldTree, newTree,createNode)
}

// diff节点
function diffNode(oldNode, newNode, createNode) {

    const patches = [];
    let node = oldNode.dom;
    let parent = node.parentNode;
    let nextNode = oldNode;

    if (oldNode.type !== newNode.type) {
        // 判断类型 - 不同替换
        patches.push({
            type: 'replace',
            parent,
            oldNode: node,
            node: createNode(newNode)
        })
        nextNode = newNode;

    } else if (oldNode.$$type === reactText) {
        // 判断文本 - 不同替换
        if (oldNode.inner !== newNode.inner) {
            // 更新文本内容
            patches.push({
                type: 'text',
                node,
                inner: newNode.inner
            })

            nextNode.inner = newNode.inner;

        }
    } else if (oldNode.$$type === reactElement) {
        // 组件 ？
        if (oldNode.type.isReactComponent) {
            // 更新子组件
            nextNode = updateCmp(oldNode, newNode);
        } else {
            // 对比 props
            let propsPatches =  diffProps(oldNode.props, newNode.props);
            if (Object.keys(propsPatches).length > 0) {
                patches.push({
                    type: 'props',
                    node,
                    props: propsPatches
                })
                nextNode.props = newNode.props;
            }
            // 递归子级
            nextNode.children = diffChildren(oldNode.children, newNode.children,createNode,node)
        }
    } else {
        console.error('diff异常！')
    }

    // 最后 

    if (patches.length > 0) {
        patch(patches); // 开始更新dom
    }
    return nextNode;
}

// diff属性
function diffProps(oldProps = {}, newProps = {}) {

    let propsPatches = {};

    for (let k in newProps) {
        if (typeof newProps[k] === 'object') {
            let subPatches = diffProps(oldProps[k], newProps[k]); //接收 递归
            if (Object.keys(subPatches).length > 0) {
                propsPatches[k] = subPatches;
            }

        } else if (k in oldProps) {
            if (oldProps[k] !== newProps[k]) {
                console.log(k, '属性值有变化')

                propsPatches[k] = newProps[k]
            }
        } else {
            console.log(k, '新增属性')
            propsPatches[k] = newProps[k]
        }
    }

    for (let k in oldProps) {
        if (!(k in newProps)) {
            console.log(k, '删除属性')
            propsPatches[k] = 'react-remove';// 删除标识
        }
    }
    return propsPatches
}
// diff子组件
// 触发情况 新增 删除 移动 
// 对比优化 将数组 装换成 对象来进行对比 {k:{},v:{}}
function diffChildren(oldChildren, newChildren, createNode, parent) {
    // console.log(oldChildren, newChildren)  // 两个数组 不易于对比

    let oldChild = getKeys(oldChildren);
    let newChild = getKeys(newChildren);
    let lastIndex = 0; // 标识 上一位 索引位置


    let patches = [];
    let nextChildren = newChildren;

    for (let k in newChild) {
        if (oldChild[k]) {
            // 新 旧 节点都存在 进行深层次比对
            nextChildren[newChild[k].index] = diffNode(oldChild[k], newChild[k],createNode);

            if (lastIndex > oldChild[k].index) {
                // 位置发生变化

                // 获取上一节点
                let prev = newChild[k].index > 0 ? newChildren[newChild[k].index - 1].dom : null;
                // 获取下一个节点
                let next = prev ? prev.nextElementSibling : parent.children[0];

                patches.push({
                    type: 'move',
                    parent,
                    node: oldChild[k].dom,
                    next
                })
            } else {
                // 位置没有变化
                lastIndex = oldChild[k].index;
            }
        } else {
            // 新增 节点
            //console.log(newChild[k],"新增项");
            let prev = newChild[k].index > 0 ? newChildren[newChild[k].index - 1].dom : null;
            let next = prev ? prev.nextElementSibling : parent.children[0];
            patches.push({
                type: "insert",
                parent,
                node: createNode(newChild[k]),
                next
            });
            nextChildren[newChild[k].index] = newChild[k];
        }
    }

    for (let k in oldChild) {
        if (!newChild[k]) {
            // 老节点被删除
            console.log(oldChild[k], "被删除了");
            patches.push({
                type: 'remove',
                node: oldChild[k].dom
            })

        }
    }

    if (patches.length > 0) {
        patch(patches);
    }
    return nextChildren;
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