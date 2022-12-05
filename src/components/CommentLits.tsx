import { spawn } from "@redux-saga/core/effects"
import React, { useState } from "react"
import { useAction } from "../hooks/useAction"
import { useTypedSelector } from "../hooks/useTypeSelector"
import { CommentNode } from "../types/commentsTree"
import { ProjectType } from "../types/projects"
import { TaskType } from "../types/task"

interface propsComment {
    comment: CommentNode
    setParent: Function
}

interface propsCommentsList {
    comments: CommentNode[],
    answer?: string
    setParent: Function
}

interface propsCommentConainer {
    taskId: number
}

const Comment: React.FC<propsComment> = ({ setParent, comment }) => {
    return (
        <div className="commentContainer">
            <div onClick={() => setParent(comment.id)}>
                <span>{comment.author} </span>
                <span>{comment.text}</span>
            </div>
            {comment.children.comments.length !== 0 && <CommentList setParent={setParent} comments={comment.children.comments} answer={comment.children.comments.length ? comment.author : undefined} />}
        </div>
    )
}

const CommentList: React.FC<propsCommentsList> = ({ setParent, comments, answer }) => {
    return (
        <div className="commentsTree">
            {answer && <span>Answer on: {answer}</span>}
            {comments.map(comment => <Comment setParent={setParent} comment={comment} />)}
        </div>
    )

}

const CommentsContainer: React.FC<propsCommentConainer> = ({ taskId }) => {
    const [author, setAuthor] = useState("");
    const [comment, setComment] = useState("");
    const [parent, setParent] = useState(-1);
    const { project } = useTypedSelector(state => state.tasks)
    const task = project.tasks.find(task => task.id === taskId);
    const { TaskUpdateAction, ProjectSaveAction } = useAction();

    if (task === undefined)
        return null;
    if (task.comments.comments === undefined && task.comments === undefined)
        return <div>Error load comments!</div>;

    console.log(task.comments.comments);
    return (
        <div className="commentList">
            <input type="text" value={comment} onChange={e => setComment(e.target.value)}></input>
            <input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
            <div onClick={() => setParent(-1)}>{parent}</div>
            <div onClick={() => {
                if(!comment.length)
                    return alert("No text in comment!");
                task.comments.add(parent, author.length ? author : "Unknown", comment);
                TaskUpdateAction(project, taskId, {comments: task.comments});
            }}
            >Отправить</div>
            <CommentList setParent={setParent} comments={task.comments.comments} />
        </div>
    )
}

export default CommentsContainer
