// 标识vdom 
const reactElement = Symbol('react.element')
// 标记string、number
const reactText = Symbol('react.text')
/**
 * 
 * @param {*} type 类型 
 * @param {*} props 属性
 * @param  {...any} children 子节点
 * @returns 
 */
function createElement(type, props, ...child) {
    delete props.__self;
    delete props.__source;

    let key = props.key;
    delete props.key;
    let children = child.flat(Infinity);

    // 处理 string 与 number（react中是在 react-dom处理的）

    children = children.map(e => {
        if (typeof e == 'object') {
            return e;
        } else if (typeof e == 'string' || typeof e == 'number') {
            // 封装
            return { $$type: reactText, type: 'textNode', inner: e }
        } else {
            return null
        }
    }).filter(e => e)
    return {
        $$type: reactElement,
        key: key !== undefined ? "RC" + key : undefined,
        type,
        props,
        children
    }
}


// class 组件

class Component {
    constructor(props) {
        this.props = props;
    }
    static isReactComponent = {};//区分组件 或者 元素
    setState(newState) {
        // 更新流程
        if (this.isBatchUpdate) {
            // 批处理 开启 不直接更新组件 
            this.nextStates.push(newState)
        } else {
            // 批处理 未开启 直接更新
            this.updater(this.props, Object.assign({}, this.state, newState))
        }
    }

}

const React = {
    createElement,
    Component
}
export { reactElement, reactText, }
export default React;