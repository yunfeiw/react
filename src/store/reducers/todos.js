/**
 * @description: 总数
 */

const todos = (state = [{ id: 0, text: '橘子', completed: false }], action) => {
    switch (action.type) {
        case "ADD_TODO":
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ]
        case "TOGGLE_TODO":
            return state.map(todo => (todo.id === action.id)
                ? { ...todo, completed: !todo.completed }
                : todo)
        default:
            return state
    }
}

export default todos