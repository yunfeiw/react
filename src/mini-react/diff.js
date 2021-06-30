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
    console.log(oldChildren, newChildren)  // 两个数组 不易于对比
}
// 更新组件
function updateCmp() {

}
export default diff;