// src/index.js
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, MediaUpload,  InnerBlocks } from '@wordpress/block-editor';

registerBlockType('client/client-information', {
    title: 'Client Information',
    icon: 'admin-users',
    category: 'widgets',
    attributes: {
        content: {
            type: 'string',
            source: 'html',
            selector: 'p',
        },
        description: {
            type: 'string',
            source: 'html',
            selector: 'p',
        },
        imgUrl: {
            type: 'string',
        },
    },
    edit: (props) => {
        const {
            attributes: { content, description, imgUrl },
            setAttributes,
        } = props;
        const blockProps = useBlockProps();
        const onChangeContent = (newContent) => {
            setAttributes({ content: newContent });
        };
        const onChangeDescription = (newDescription) => {
            setAttributes({ description: newDescription });
        };
        const onImageSelect = (newImgUrl) => {
            setAttributes({ imgUrl: newImgUrl.sizes.full.url });
        };
        const ALLOWED_BLOCKS = [ 'core/social-links' ];
        return (
            <div className='client-info-card'>
                <div className='client-info-image-left'>
                    <MediaUpload onSelect={onImageSelect}
                        render={
                            ({ open }) => {
                                return imgUrl ? <img onClick={open} src={imgUrl} /> : <button onClick={open}> Upload Client Image </button>
                            }
                        }
                        title="Insert Image"
                    />
                </div>
                <div className='client-info-description-right'>
                    <RichText {...blockProps}
                        tagName='h5'
                        onChange={onChangeContent}
                        placeholder='Client Name'
                        value={content} 
                    />
                    <RichText {...blockProps}
                        tagName='p'
                        onChange={onChangeDescription}
                        placeholder='Client Description'
                        value={description} />
                    <InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
                </div>
            </div>
        )

    },
    save: (props) => {
        const blockProps = useBlockProps.save();
        return (
            <div className='client-info-card'>
                <div className='client-info-image-left'>
                    <img src={props.attributes.imgUrl} />
                </div>
                <div className='client-info-description-right'>
                    <RichText.Content {...blockProps}
                        tagName='h5'
                        value={props.attributes.content}
                    />
                    <RichText.Content {...blockProps}
                        tagName='p'
                        value={props.attributes.description}
                    />
                    <InnerBlocks.Content />
                </div>
            </div>
        )
    }
});