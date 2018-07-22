/* @flow */
import React from 'react';
import {
  EditorState, ContentState, convertFromHTML, convertToRaw,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../style.scss';
import type { ItemProps } from '../../addons/types';

type OtherProps = {
  content: ?string,
  className?: string,
  editingClassName?: string,
};

type State = {
  editorState: EditorState,
  enableEditing: boolean,
  content: ?string,
};

export default class extends React.Component<ItemProps & OtherProps, State> {
  constructor(props: ItemProps & OtherProps) {
    super(props);
    const { content } = props;
    const blocksFromHTML = convertFromHTML(content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );

    this.state = {
      editorState: EditorState.createWithContent(state),
      enableEditing: false,
      content,
    };
  }

  componentDidUpdate() {
    const { enableEditing } = this.state;
    if (enableEditing) {
      this.editorReference.focus();
    }
  }

  onEditorStateChange = (editorState: EditorState) => {
    const { id, onPropsChanged } = this.props;
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const content = draftToHtml(rawContentState);
    this.setState({
      editorState,
      content,
    });
    if (onPropsChanged) {
      onPropsChanged({ id, content });
    }
  };

  setEditorReference = (editor: Editor) => {
    this.editorReference = editor;
  };

  toggleEditingState = () => {
    const { enableEditing } = this.state;
    const { id, onPropsChanged } = this.props;
    this.setState({
      enableEditing: !enableEditing,
    });
    if (onPropsChanged) {
      onPropsChanged({ id, disableDragging: !enableEditing });
    }
  };

  editorReference: Editor;

  render() {
    const {
      id, width, height, className = '', editingClassName = '',
    } = this.props;
    const { editorState, enableEditing, content } = this.state;
    const editingStyle = enableEditing ? editingClassName : '';
    return (
      <div
        className={`editable-content ${className} ${editingStyle}`}
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
