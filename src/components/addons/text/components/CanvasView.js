/* @flow */
import React from 'react';
import {
  EditorState, ContentState, convertFromHTML, convertToRaw,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../text.scss';
import type { ItemProps } from '../../types';

const initText = '<p>TEXT</p>';

type State = {
  editorState: EditorState,
  enableEditing: boolean,
  content: string,
};

export default class extends React.Component<ItemProps, State> {
  constructor(props: ItemProps) {
    super(props);
    const blocksFromHTML = convertFromHTML(initText);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );

    this.state = {
      editorState: EditorState.createWithContent(state),
      enableEditing: false,
      content: initText,
    };
  }

  componentDidUpdate() {
    const { enableEditing } = this.state;
    if (enableEditing) {
      this.editorReference.focus();
    }
  }

  onEditorStateChange = (editorState: EditorState) => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    this.setState({
      editorState,
      content: draftToHtml(rawContentState),
    });
  };

  setEditorReference = (editor: Editor) => {
    this.editorReference = editor;
  };

  toggleEditingState = () => {
    const { enableEditing } = this.state;
    this.setState({
      enableEditing: !enableEditing,
    });
  };

  editorReference: Editor;

  render() {
    const { id, width, height } = this.props;
    const { editorState, enableEditing, content } = this.state;
    const editingStyle = enableEditing ? 'addon-text--editing' : '';
    return (
      <div
        className={`addon-text ${editingStyle}`}
        id={id}
        style={{
          width,
          height,
        }}
        onDoubleClick={this.toggleEditingState}
      >
        {!enableEditing && <div dangerouslySetInnerHTML={{ __html: content }} />}
        {enableEditing && (
          <Editor
            editorRef={this.setEditorReference}
            editorState={editorState}
            onBlur={this.toggleEditingState}
            onEditorStateChange={this.onEditorStateChange}
            toolbar={{
              options: [
                'inline',
                'colorPicker',
                'blockType',
                'fontSize',
                'list',
                'textAlign',
                'link',
              ],
              inline: {
                inDropdown: true,
              },
              list: {
                inDropdown: true,
              },
              textAlign: {
                inDropdown: true,
              },
            }}
          />
        )}
      </div>
    );
  }
}
