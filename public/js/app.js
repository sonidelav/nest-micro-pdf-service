((w) => {
    const $ = w.jQuery;
    const Vue = w.Vue;

    new Vue({
        el: '#app',
        data: () => ({
            htmlContent: "<h1>HELLO WORLD</h1>",
            url: "http://www.google.gr"
        }),
        methods: {
            async urlToPdf() {
                const resp = await $.ajax({
                    url: '/pdf/render-url',
                    type: 'POST',
                    contentType: 'application/json',
                    responseType: 'arraybuffer',
                    data: JSON.stringify({
                        url: this.url,
                        filename: 'urlContent.pdf',
                        json: true,
                        options: {
                            screen: true,
                            page: {
                                format: "A4",
                                landscape: false,
                                height: null,
                                width: null
                            }
                        }
                    }),
                });

                if (resp) {
                    const a = document.createElement('a');
                    a.href = "data:" + resp.mimeType + ";base64," + resp.content;
                    a.target = '_blank';
                    a.download = resp.filename;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                }
            },
            async htmlToPdf() {
                const resp = await $.ajax({
                    url: '/pdf/render-html',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        html: this.htmlContent,
                        filename: 'htmlContent.pdf',
                        json: true,
                        options: {
                            screen: true,
                            page: {
                                format: "A4",
                                landscape: false,
                                height: null,
                                width: null
                            }
                        }
                    })
                });

                if (resp) {
                    const a = document.createElement('a');
                    a.href = "data:" + resp.mimeType + ";base64," + resp.content;
                    a.target = '_blank';
                    a.download = resp.filename;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                }
            }
        }
    });

})(window)