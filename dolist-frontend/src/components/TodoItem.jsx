import { useState, useEffect, useRef } from 'react'
import { useTodo } from '../context/TodoContext'
import { showErrorToast } from '../utils/toast.js'

function TodoItem({ todo_title, todoId, todo_isCompleted }) {
  const { todos, setTodos, loading, updateTodo, completeTodo, deleteTodo } = useTodo();

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo_title);

  const inputRef = useRef();

  const handleComplete = async () => {
    try {
      await completeTodo(todoId);

      const updatedTodos = todos.map(t =>
        t._id === todoId
          ? { ...t, todo_isCompleted: !todo_isCompleted }
          : t
      );
      setTodos(updatedTodos);
    } catch (error) {
      return showErrorToast(error);
    }
  }

  useEffect(() => {
    if (isEditing) {
      const input = inputRef.current;
      input.focus();
      // Move cursor to the end of the input text
      input.setSelectionRange(input.value.length, input.value.length);
    }
  }, [isEditing]);

  useEffect(() => {
    setText(todo_title);
  }, [todo_title]);

  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleSave = async () => {
    if (!text.trim()) {
      setText(todo_title);
      setIsEditing(false);
      return;
    }

    try {
      await updateTodo(todoId, { todo_title: text.trim() });

      const updatedTodos = todos.map(t =>
        t._id === todoId ? { ...t, todo_title: text.trim() } : t
      );
      setTodos(updatedTodos);
      setIsEditing(false);
    } catch (error) {
      setIsEditing(false);
      return showErrorToast(error);
    }
  }

  const handleCancel = () => {
    setIsEditing(false);
    setText(todo_title);
  }

  const handleDelete = async () => {
    try {
      await deleteTodo(todoId);

      const updatedTodos = todos.filter((t) => t._id !== todoId);
      setTodos(updatedTodos);
    } catch (error) {
      return showErrorToast(error);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  }

  return (
    <div className={`group relative bg-white rounded-lg border-2 transition-all duration-300 hover:shadow-md
      ${todo_isCompleted
        ? 'border-green-200 border-t-5 border-t-green-400 bg-green-50/50'
        : 'border-gray-200 hover:border-pink-300'
      }`}>

      <div className="p-3 sm:p-4">
        {isEditing ? (
          // Edit Mode
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1">
              <input
                type="text"
                className="w-full px-3 py-2 text-sm sm:text-base bg-white border-2 border-pink-300 
                         rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200 
                         focus:border-pink-500 transition-all duration-200"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={inputRef}
                placeholder="Enter todo text..."
              />
            </div>

            <div className="flex items-center justify-end gap-2 sm:gap-3">
              <button
                className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full 
                         bg-green-100 hover:bg-green-200 text-green-600 hover:text-green-700 
                         transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 
                         focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSave}
                disabled={loading}
                title="Save (Enter)"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>

              <button
                className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full 
                         bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 
                         transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 
                         focus:ring-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleCancel}
                disabled={loading}
                title="Cancel (Escape)"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          // View Mode
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Checkbox */}
            <div className="flex-shrink-0">
              <label className="relative flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={todo_isCompleted}
                  onChange={handleComplete}
                />
                <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 transition-all duration-200
                  ${todo_isCompleted
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-300 hover:border-pink-400'
                  }`}>
                  {todo_isCompleted && (
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white absolute top-0.5 left-0.5 sm:top-1 sm:left-1"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </label>
            </div>

            {/* Todo Text */}
            <div className="flex-1 min-w-0">
              <p className={`text-sm sm:text-base leading-relaxed transition-all duration-200
                ${todo_isCompleted
                  ? 'line-through text-gray-500'
                  : 'text-gray-800'
                }`}>
                {text}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full 
                         bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-700 
                         transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 
                         focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleEdit}
                disabled={loading}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>

              <button
                className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full 
                         bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 
                         transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 
                         focus:ring-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleDelete}
                disabled={loading}
                title="Delete todo"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TodoItem