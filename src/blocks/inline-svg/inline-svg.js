import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';
import { Button, Panel, PanelBody, PanelRow } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import metadata from './block.json';

registerBlockType(metadata.name, {
    ...metadata,
	edit(props) {
        const { attributes, setAttributes, context: {postType, postID } } = props;

        const onSelectMedia = (media) => {
			setAttributes({
				mediaId: media.id,
				mediaUrl: media.url,
			})
		}

		const removeMedia = () => {
			setAttributes({
                ...attributes,
                mediaId: 0,
                mediaUrl: ''
			});
		}

        const updateLinkURL = (url) => {
            setAttributes({
                ...attributes,
                linkURL: url
            });
        }

        const updateLinkClasses = (classes) => {
            setAttributes({
                ...attributes,
                linkClasses: classes
            });
        }

        const updateSVGClasses = (classes) => {
            setAttributes({
                ...attributes,
                svgClasses: classes
            });
        }

        return (
            <Fragment>
                <InspectorControls>
                    <Panel header={__("Inline SVG", metadata.textdomain)}>
                        <PanelBody title={__('SVG Image', metadata.textdomain)} initialOpen={true} >
                            <PanelRow>
                                <div className="editor-post-featured-image  border border-dashed border-black">
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={onSelectMedia}
                                        value={attributes.mediaId}
                                        allowedTypes={['image/svg', 'image/svg+xml']}
                                        render={({open}) => (
                                            <Button
                                                className={attributes.mediaId == 0 ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
                                                onClick={open}
                                            >
                                                {attributes.mediaId == 0 && __('Choose an image', metadata.textdomain)}
                                                {attributes.mediaUrl != undefined &&
                                                    <Fragment>
                                                        <img src={ attributes.mediaUrl } />
                                                    </Fragment>
                                                }
                                            </Button>
                                        )}
                                    />
                                </MediaUploadCheck>
                                {attributes.mediaId != 0 &&
                                    <MediaUploadCheck>
                                        <MediaUpload
                                            title={__('Replace image', metadata.textdomain)}
                                            value={attributes.mediaId}
                                            onSelect={onSelectMedia}
                                            allowedTypes={['image']}
                                            render={({open}) => (
                                                <Button onClick={open}>{__("Replace image", metadata.textdomain)}</Button>
                                            )}
                                        />
                                    </MediaUploadCheck>
                                }
                                {attributes.mediaId != 0 &&
                                    <MediaUploadCheck>
                                        <Button onClick={removeMedia} isDestructive>{__("Remove image", metadata.textdomain)}</Button>
                                    </MediaUploadCheck>
                                }
                                </div>
                            </PanelRow>
                            <PanelRow className="items-start flex-col gap-y-2">
                                <label>{__("SVG Classes", metadata.textdomain)}</label>
                                <input type="text" value={ attributes.svgClasses } onChange={ (e) => updateSVGClasses(e.target.value) } />
                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={__('Link/URL', metadata.textdomain)}>
                            <PanelRow className="items-start flex-col gap-y-2">
                                <label>{__("Link URL", metadata.textdomain)}</label>
                                <input type="text" value={ attributes.linkURL } onChange={ (e) => updateLinkURL(e.target.value) } />
                            </PanelRow>
                            <PanelRow className="items-start flex-col gap-y-2">
                                <label>{__("Link Classes", metadata.textdomain)}</label>
                                <input type="text" value={ attributes.linkClasses } onChange={ (e) => updateLinkClasses(e.target.value) } />
                            </PanelRow>
                        </PanelBody>
                    </Panel>
                </InspectorControls>
                <ServerSideRender block={ 'tailpress-blocks/inline-svg' } attributes={ attributes } className="relative h-max" />
            </Fragment>
        );
    },
    save(props) {
        return null;
    }
});
