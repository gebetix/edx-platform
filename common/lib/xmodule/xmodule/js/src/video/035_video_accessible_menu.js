(function(define) {
    'use strict';
// VideoTranscriptDownloadHandler module.
    define(
'video/035_video_accessible_menu.js', ['underscore'],
    function(_) {
    /**
     * Video Download Transcript control module.
     * @exports video/035_video_accessible_menu.js
     * @constructor
     * @param {jquery Element} element
     * @param {Object} options
     */
        var VideoTranscriptDownloadHandler = function(element, options) {
            if (!(this instanceof VideoTranscriptDownloadHandler)) {
                return new VideoTranscriptDownloadHandler(element, options);
            }

            _.bindAll(this, 'bindHandlers', 'clickHandler');

            this.container = element;
            this.options = options || {};

            if (this.container.find('.wrapper-downloads .wrapper-download-transcripts')) {
                this.initialize();
            }

            return false;
        };

    VideoTranscriptDownloadHandler.prototype = {
        // Initializes the module.
        initialize: function() {
            this.value = this.options.storage.getItem('transcript_download_format');
            this.el = this.container.find('.list-download-transcripts');
            this.bindHandlers();
        },

        // Bind any necessary function callbacks to DOM events.
        bindHandlers: function() {
            // Attach click and keydown event handlers to individual menu items.
            this.el.on('click', '.btn-link', this.clickHandler);
        },

        // Various event handlers. We delay link clicks until tileType is set
        clickHandler: function(event) {
            var fileType = $(event.currentTarget).data('value'),
                data = {transcript_download_format: fileType},
                downloadUrl = $(event.currentTarget).attr('href'),
                that = this;

            event.preventDefault();

            $.ajax({
                url: that.options.saveStateUrl,
                type: 'POST',
                dataType: 'json',
                data: data,
                success: function() {
                    that.options.storage.setItem('transcript_download_format', fileType);
                },
                complete: function() {
                    document.location.href = downloadUrl;
                }
            });
        }
    };

    return VideoTranscriptDownloadHandler;
});
}(RequireJS.define));
