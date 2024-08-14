<?php
    extract($attributes);
    $wrapper_attributes = get_block_wrapper_attributes(array('class' => ($svgClasses ?? '')));

    //get file path from url
    $file_path = parse_url($attributes['mediaUrl'], PHP_URL_PATH);
    $svg = file_get_contents(ABSPATH . $file_path);

    $linkOpen = '';
    $linkClose = '';

    if(isset($linkURL) && $linkURL !== '') {
        $linkClasses = $linkClasses . ' inline-svg-link'  ??  'inline-svg-link';

        $linkOpen = <<<HTML
        <a href="{$linkURL}" class="{$linkClasses}">
        HTML;

        $linkClose = '</a>';
    }
?>
<div <?php echo $wrapper_attributes; ?>>
    <?php echo $linkOpen; ?>
    <?php echo $svg; ?>
    <?php echo $linkClose; ?>
</div>