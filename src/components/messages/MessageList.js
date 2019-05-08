import React, { Component } from "react";
import MessageForm from "./MessageForm";
import "./messages.css";

export default class MessageList extends Component {
  editButton = message => {
    if (Number(sessionStorage.getItem("userId")) === message.userId) {
      return (
        <button
          className="btn btn-primary"
          onClick={() => {
            this.props.history.push(`/messages/${message.id}/edit`);
          }}
        >
          Edit
        </button>
      );
    }
  };

  deleteButton = message => {
    if (Number(sessionStorage.getItem("userId")) === message.userId) {
      return (
        <button
          className="btn btn-primary"
          onClick={() => {
            this.props.deleteMessage(`/messages/${message.id}`);
          }}
        >
          Delete
        </button>
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <article className="messages contentContainer">
        <h3>Ask The Members</h3>
          <section className="send-message">
            <MessageForm {...this.props} />
          </section>
          <section
            className="list-group message_box"
            ref={message => {
              this.messageBox = message;
            }}
          >
            {this.props.messages.map(message => (
              <div key={message.id} className="card list-group-item">
                <div className="card-body">
                  <h5 className="card-title">
                    {
                      this.props.users.find(user => user.id === message.userId)
                        .userName
                    }
                  </h5>
                  <div className="card-text">{message.message}
                  <p>
                  {message.messageTimeStamp} </p>
                    </div>
                  {this.editButton(message)}
                  {this.deleteButton(message)}
                </div>
              </div>
            ))}
          </section>
        </article>
      </React.Fragment>
    );
  }
}
