import React from 'react';
import { Col, Row , Card } from 'ant';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './index.less';

export default class App extends React.Component {
  state = {
    editorState: EditorState.createEmpty(),
    contentState: ''
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  onContentStateChange = (contentState) => {
    this.setState({
      contentState,
    });
  }
  render() {
    const { editorState, contentState } = this.state;
    return (
      <div className="editor-page">
        <Editor
          editorClassName="editor"
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
          onContentStateChange={this.onContentStateChange}
          localization={{ locale: 'zh' }}
        />
        <Row gutter={10} className="textarea">
          <Col md={12}>
            <Card title="同步转换为html">
              <textarea
                rows={5}
                disabled
                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
              />
            </Card>
          </Col>
          <Col md={12}>
            <Card title="同步转换为json">
              <textarea
                rows={5}
                disabled
                value={JSON.stringify(contentState, null, 4)}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}