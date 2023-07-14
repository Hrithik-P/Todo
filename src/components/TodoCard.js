import React from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { Input } from "reactstrap";
import { completeTodo } from "../redux/todoSlice";
import { useDispatch } from "react-redux";

const TodoCard = (props) => {
  const { todo, handleEdit, handleDeleteTodo } = props;
  const dispatch = useDispatch();
  const handleCompletedTodo = (id) => {
    dispatch(completeTodo(id));
  };
  return (
    <div>
      <div className="card mb-2">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div>{todo?.content}</div>
            <div className="ml-auto d-flex align-items-center">
              <FiEdit
                size="1rem"
                onClick={() => {
                  handleEdit(todo.id);
                }}
                className="mx-2"
              />
              <Input
                addon
                className="mx-2"
                type="checkbox"
                onClick={(e) => {
                  handleCompletedTodo(todo.id);
                }}
                checked={todo.completed}
              />
              {todo.completed && (
                <MdDelete
                  size="1rem"
                  style={{
                    color: "red",
                  }}
                  onClick={() => {
                    handleDeleteTodo(todo.id);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
