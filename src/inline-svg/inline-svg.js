import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';
import { Button, Panel, PanelBody, PanelRow } from '@wordpress/components';

import metadata from './block.json';

registerBlockType(metadata.name, {
    ...metadata,
	edit(props) {
        const { attributes, setAttributes } = props;
        
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
                    <Panel header="Inline SVG">
                        <PanelBody title={'SVG Image'} initialOpen={true} >
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
                                                {attributes.mediaId == 0 && 'Choose an image'}
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
                                            title={'Replace image'}
                                            value={attributes.mediaId}
                                            onSelect={onSelectMedia}
                                            allowedTypes={['image']}
                                            render={({open}) => (
                                                <Button onClick={open}>Replace image</Button>
                                            )}
                                        />
                                    </MediaUploadCheck>
                                }
                                {attributes.mediaId != 0 &&
                                    <MediaUploadCheck>
                                        <Button onClick={removeMedia} isDestructive>Remove image</Button>
                                    </MediaUploadCheck>
                                }
                                </div>
                            </PanelRow>
                            <PanelRow className="items-start flex-col gap-y-2">
                                <label>SVG Classes</label>
                                <input type="text" value={ attributes.svgClasses } onChange={ (e) => updateSVGClasses(e.target.value) } />
                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={'Link/URL'}>
                            <PanelRow className="items-start flex-col gap-y-2">
                                <label>Link URL</label>
                                <input type="text" value={ attributes.linkURL } onChange={ (e) => updateLinkURL(e.target.value) } />
                            </PanelRow>
                            <PanelRow className="items-start flex-col gap-y-2">
                                <label>Link Classes</label>
                                <input type="text" value={ attributes.linkClasses } onChange={ (e) => updateLinkClasses(e.target.value) } />
                            </PanelRow>
                        </PanelBody>
                    </Panel>
                </InspectorControls>
                <ServerSideRender block={ 'tailpress/inline-svg' } attributes={ attributes } className="relative h-max" />
            </Fragment>
        );
    },
    save(props) {
        return null;
    }
});
