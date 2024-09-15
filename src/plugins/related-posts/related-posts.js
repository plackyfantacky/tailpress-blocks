import { registerBlockType } from '@wordpress/blocks';
import { registerPlugin } from "@wordpress/plugins";
import { PluginSidebar, PluginSidebarMoreMenuItem } from "@wordpress/edit-post";
import Select, { components } from "react-select";

import { __ } from "@wordpress/i18n";

import metadata from './block.json';

const sidebar_icon = <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M14 2a3 3 0 0 1 .054 6l-.218.653A4.5 4.5 0 0 1 15.89 11.5h1.319a2.5 2.5 0 1 1 0 2h-1.32a4.5 4.5 0 0 1-1.006 1.968l.704.704a2.5 2.5 0 1 1-1.414 1.414l-.934-.934A4.5 4.5 0 0 1 11.5 17a4.5 4.5 0 0 1-1.982-.46l-.871 1.046a3 3 0 1 1-1.478-1.35l.794-.954A4.48 4.48 0 0 1 7 12.5c0-.735.176-1.428.488-2.041l-.868-.724A2.5 2.5 0 1 1 7.9 8.2l.87.724a4.48 4.48 0 0 1 3.169-.902l.218-.654A3 3 0 0 1 14 2M6 18a1 1 0 1 0 0 2a1 1 0 0 0 0-2m10.5 0a.5.5 0 1 0 0 1a.5.5 0 0 0 0-1m-5-8a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5m8 2a.5.5 0 1 0 0 1a.5.5 0 0 0 0-1m-14-5a.5.5 0 1 0 0 1a.5.5 0 0 0 0-1M14 4a1 1 0 1 0 0 2a1 1 0 0 0 0-2"></path></g></svg>


registerPlugin('tailpress-blocks-related-posts-sidebar', {
    icon: sidebar_icon,
    render: () => {
        return (
            <>
                <PluginSidebarMoreMenuItem
                    target="tailpress-blocks-related-posts-sidebar"
                >
                    {__('Related Posts & Links', metadata.textdomain)}
                </PluginSidebarMoreMenuItem>
                <PluginSidebar
                    name="tailpress-blocks-related-posts-sidebar"
                    title={__('Related Posts & Links', metadata.textdomain)}
                >
                    <Select
                        options={[
                            { value: 'related-posts', label: 'Related Posts' },
                            { value: 'links', label: 'Links' },
                        ]}
                    />
                </PluginSidebar>
            </>
        )
    }
});

registerBlockType(metadata.name, {
    ...metadata,
    edit(props) {
        return (
            <></>
        )
    },
    save(props) {
        return null;
    }
});
