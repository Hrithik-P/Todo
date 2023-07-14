import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, editTodo } from "../../redux/todoSlice";
import TodoCard from "../../components/TodoCard";
import { useForm } from "react-hook-form";
import { TiPlus } from "react-icons/ti";

const TodoList = () => {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState("");
  const [edit, setEdit] = useState(undefined);

  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    setValue("todo", edit ? edit.content : null);
  }, [edit]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  // modal
  const handleClose = () => {
    setShow(false);
    setEdit(undefined);
  };

  const handleShow = () => {
    setShow(true);
    setEdit(null);
  };

  // todo crud functions

  const handleEdit = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setEdit(todo);
      setContent(todo.content);
      setShow(true);
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const onSubmit = (data) => {
    if (edit) {
      dispatch(editTodo({ id: edit.id, content: data ? data?.todo : content }));
    } else {
      dispatch(addTodo({ id: todos.length + 1, content: data.todo }));
    }
    setShow(false);
    reset();
  };

  return (
    <React.Fragment>
      <div className="px-4 py-4">
        <h3 className=" py-3 position-fixed top-0 z-2 w-100 bg-white">
          Todo List
        </h3>
        {todos.length > 0 ? (
          <div className="mb-4 mt-5">
            {todos
              ?.map((todo) => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  handleEdit={handleEdit}
                  handleDeleteTodo={handleDeleteTodo}
                />
              ))
              ?.reverse()}
          </div>
        ) : (
          <div className="text-center mt-5 todo-des">
            Add Some Todos that you Should not Forget
          </div>
        )}
        <div className="d-flex justify-content-center position-fixed add-btn">
          <Button
            color="success"
            className="rounded-circle py-2 "
            onClick={() => handleShow()}
          >
            <TiPlus size="1.8rem" className="text-white" />
          </Button>
        </div>
      </div>

      {/* modal */}

      <Modal isOpen={show} toggle={handleClose} centered={true}>
        <ModalHeader>{edit ? "Edit" : "Add"} Todo</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              {...register("todo", { required: true })}
              name="todo"
            />
            <br />
            {errors.todo && (
              <span className="text-danger">This field is required</span>
            )}
            <div className="mt-3">
              <Button color="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button color="primary" className="mx-2" type="submit">
                save
              </Button>{" "}
            </div>
          </form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default TodoList;
