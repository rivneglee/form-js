import React from 'react';
import {
  EditorState,
  SelectionState,
  ContentState,
  convertFromHTML,
  convertToRaw,
  DefaultDraftBlockRenderMap,
  RichUtils,
  Modifier,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
  blockRenderMap,
  CheckableListItem,
  CheckableListItemUtils,
  CHECKABLE_LIST_ITEM,
} from 'draft-js-checkable-list-item';
import 'draft-js-checkable-list-item/lib/CheckableListItem.css';

import '../style.scss';
import type { ItemProps } from '../../types';

type OtherProps = {};

type State = {};

const setBlockTypeForEditorState = (editorState) => {
  const contentState = editorState.getCurrentContent();
  const blockMap = contentState.getBlockMap();
  const selection = new SelectionState({
    anchorKey: blockMap.first().getKey(),
    focusKey: blockMap.last().getKey(),
  });

  return EditorState.push(
    editorState,
    Modifier.setBlockType(contentState, selection, CHECKABLE_LIST_ITEM),
    'change-block-type',
  );
};

export default class extends React.Component<ItemProps & OtherProps, State> {
  constructor(props: ItemProps & OtherProps) {
    super(props);
    const { options } = props;
    const blocksFromHTML = convertFromHTML(options.reduce((c, n) => c + n, ''));
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );
    const editorState = setBlockTypeForEditorState(EditorState.createWithContent(contentState));

    this.state = {
      editorState,
      enableEditing: false,
      options,
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
    const options = this.convertToOptionArray(editorState);
    if (RichUtils.getCurrentBlockType(editorState) !== CHECKABLE_LIST_ITEM) {
      this.setState({
        editorState: RichUtils.toggleBlockType(editorState, CHECKABLE_LIST_ITEM),
        options,
      });
    } else {
      this.setState({
        editorState,
        options,
      });
    }
    if (onPropsChanged) {
      onPropsChanged({ id, options });
    }
  };

  setEditorReference = (editor: Editor) => {
    this.editorReference = editor;
  };

  blockRendererFn = (block) => {
    if (block.getType() === CHECKABLE_LIST_ITEM) {
      const { editorState } = this.state;
      return {
        component: CheckableListItem,
        props: {
          onChangeChecked: () => this.onEditorStateChange(
            CheckableListItemUtils.toggleChecked(editorState, block),
          ),
          checked: !!block.getData().get('checked'),
        },
      };
    }
    return null;
  };

  convertToOptionArray = (editorState) => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    /* eslint-disable-next-line */
    rawContentState.blocks.forEach(b => (b.type = 'unstyled'));
    const content = draftToHtml(rawContentState);
    return content.match(/<p>(.*?)<\/p>/gi);
  };

  blockStyleFn = (block): ?string => {
    if (block.getType() === CHECKABLE_LIST_ITEM) {
      return CHECKABLE_LIST_ITEM;
    }
    return '';
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

  render() {
    const { editorState, enableEditing, options } = this.state;
    return (
      <div onDoubleClick={this.toggleEditingState}>
        {!enableEditing
          && options.map(o => (
            <div className="addon-checkbox-list__option" key={`option_${o}`}>
              <input type="checkbox" />
              <span dangerouslySetInnerHTML={{ __html: o }} />
            </div>
          ))}
        {enableEditing && (
          <div className="addon-checkbox-list__editor">
            <Editor
              editorState={editorState}
              editorRef={this.setEditorReference}
              blockRendererFn={this.blockRendererFn}
              blockRenderMap={DefaultDraftBlockRenderMap.merge(blockRenderMap)}
              blockStyleFn={this.blockStyleFn}
              onEditorStateChange={this.onEditorStateChange}
              onBlur={this.toggleEditingState}
              toolbar={{
                options: ['inline', 'colorPicker', 'fontSize', 'link'],
                inline: {
                  inDropdown: true,
                },
              }}
            />
          </div>
        )}
      </div>
    );
  }
}
