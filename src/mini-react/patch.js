function patch(patches) {
    patches.forEach(p => {
        switch (p.type) {
            case 'replace':
                p.parent.replaceChild(p.node, p.oldNode);
                break;
            case 'text':
                p.node.textContent = p.inner;
                break;
            case 'props':
                patchProps(p.node, p.props);
                break;
            case 'move':
            case 'insert':
                p.parent.insertBefore(p.node, p.next);
                break;
            case 'remove':
                p.node.remove();
                break;

        }
    })
}

function patchProps(node, props) {
    for (let s in props) {
        if (props[s] === "react-remove") {
            // 需要判断如果是 DOM 属性，使用removeAttribute，否则 delete node[s]
            delete node[s];
        } else if (s === 'style') {
            for (let styl in props['style']) {
                node["style"][styl] = props["style"][styl];
            }
        } else if (s.slice(0, 2) === "on") {
            node[s.toLocaleLowerCase()] = props[s];
        } else {
            node[s] = props[s];
        }
    }
}
export default patch;