module.exports = function () {
    let html = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css?family=Parisienne&display=swap" rel="stylesheet">
        <title>G-List</title>
    </head>
    <style>
        body {
            margin: 0;
            padding: 0;
            display: block;
            background: #F9FCFF;
        }
    
        .header {
            position: fixed;
            top: 0;
            width: 100%;
            height: 10vh;
            margin: 0 auto;
            font-family: 'Parisienne', cursive, sans-serif;
            text-align: center;
            background: #3C91E6;
            color: #F9FCFF;
            -webkit-box-shadow: 0px 3px 2px -2px rgba(47, 51, 56, 0.64);
            -moz-box-shadow: 0px 3px 2px -2px rgba(47, 51, 56, 0.64);
            box-shadow: 0px 3px 2px -2px rgba(47, 51, 56, 0.64);
        }
    
        .header-text {
            height: 10vh;
            line-height: 10vh;
            font-size: 8vh;
            margin: 0;
            padding: 0;
        }
    
        .content {
            position: fixed;
            top: 10%;
            width: 100%;
            overflow: scroll;
            height: 75vh;
            font-family: sans-serif;
            padding: 2.5% 0;
        }
    
        .inner-content {
            width: 75%;
            margin-left: 12.5%;
            height: auto;
            overflow: scroll;
            border-radius: 8px;
            box-shadow: 2px 2px 4px rgba(117, 155, 203, 0.242),
                -2px -2px 4px rgba(117, 155, 203, 0.242);
        }
    
        .invite-header {
            height: 32px;
            line-height: 32px;
            font-size: 24px;
            text-align: center;
            text-transform: capitalize;
            color: #3C91E6;
            margin-bottom: 32px;
            padding: 2%;
        }
    
        .promo-image {
            padding: 2%;
            display: block;
            width: 96%;
            height: auto;
            border-radius: 8px;
        }
    
        .invite-message {
            height: auto;
            padding: 2%;
            line-height: 16px;
            color: #2F3338;
        }
    
        .invite-credentials {
            height: auto;
            width: 100%;
            line-height: 16px;
            color: #2F3338;
        }
    
        .credential-message {
            background: #3C91E6;
            color: #F9FCFF;
            height: 10vh;
            line-height: 10vh;
            font-size: 32px;
        }
    
        .credential-message,
        .email,
        .password {
            height: auto;
            width: 100%;
            text-align: center;
        }
        
        .email, .password {
            font-size: 16px;
            line-height: 16px;
            padding: 2%;
            color: #2F3338;
        }
    
        .invite-button {
            height: 10vh;
            line-height: 10vh;
            font-size: 7vh;
            display: block;
            width: 96%;
            text-align: center;
            border-radius: 8px;
            margin: 2%;
            color: #F9FCFF;
            background: #3C91E6;
            text-transform: capitalize;
            text-decoration: none;
            transition: 0.3s;
        }
    
        .invite-button:hover {
            color: #3C91E6;
            background: #F9FCFF;
        }
    
        .footer {
            position: fixed;
            top: 90%;
            width: 100%;
            height: 10vh;
            line-height: 10vh;
            font-family: sans-serif;
            background: #3C91E6;
            color: #F9FCFF;
        }
    </style>
    
    <body style="margin: 0;padding: 0;display: block;background: #F9FCFF;">
        <div class="header" style="position: fixed;top: 0;width: 100%;height: 10vh;margin: 0 auto;font-family: 'Parisienne', cursive, sans-serif;text-align: center;background: #3C91E6;color: #F9FCFF;-webkit-box-shadow: 0px 3px 2px -2px rgba(47, 51, 56, 0.64);-moz-box-shadow: 0px 3px 2px -2px rgba(47, 51, 56, 0.64);box-shadow: 0px 3px 2px -2px rgba(47, 51, 56, 0.64);">
            <h1 class="header-text" style="height: 10vh;line-height: 10vh;font-size: 8vh;margin: 0;padding: 0;">G-List</h1>
        </div>
        <div class="content" style="position: fixed;top: 10%;width: 100%;overflow: scroll;height: 75vh;font-family: sans-serif;padding: 2.5% 0;">
            <div class="inner-content" style="width: 75%;margin-left: 12.5%;height: auto;overflow: scroll;border-radius: 8px;box-shadow: 2px 2px 4px rgba(117, 155, 203, 0.242),
                -2px -2px 4px rgba(117, 155, 203, 0.242);">
                <div class="invite-header" style="height: 32px;line-height: 32px;font-size: 24px;text-align: center;text-transform: capitalize;color: #3C91E6;margin-bottom: 32px;padding: 2%;">
                    {{username}} has invited you to join G-List!
                </div>
                <img src="https://images.unsplash.com/photo-1506617564039-2f3b650b7010?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="vegetable stand" class="promo-image" style="padding: 2%;display: block;width: 96%;height: auto;border-radius: 8px;">
                <div class="invite-message" style="height: auto;padding: 2%;line-height: 16px;color: #2F3338;">
                    Nulla vel sapien imperdiet, tincidunt diam eget, scelerisque libero. Praesent tincidunt finibus diam.
                    Maecenas ultricies neque a tincidunt tristique. Phasellus eget massa eget nibh ornare luctus hendrerit a
                    libero. Pellentesque quis quam sit amet nibh fermentum lobortis sed sit amet tellus. Pellentesque
                    efficitur iaculis lectus, ut commodo erat. Quisque viverra posuere tincidunt.
                </div>
                <div class="invite-credentials" style="height: auto;width: 100%;line-height: 16px;color: #2F3338;">
                    <div class="credential-message" style="background: #3C91E6;color: #F9FCFF;height: auto;line-height: 10vh;font-size: 32px;width: 100%;text-align: center;">
                        Use the credentials below to join today!
                    </div>
                    <div class="email" style="height: auto;width: 100%;text-align: center;font-size: 16px;line-height: 16px;padding: 2%;color: #2F3338;">
                        Email: {{email}}
                    </div>
                    <div class="password" style="height: auto;width: 100%;text-align: center;font-size: 16px;line-height: 16px;padding: 2%;color: #2F3338;">
                        Password: {{password}}
                    </div>
                </div>
                <a href="#" class="invite-button" style="height: 10vh;line-height: 10vh;font-size: 7vh;display: block;width: 96%;text-align: center;border-radius: 8px;margin: 2%;color: #F9FCFF;background: #3C91E6;text-transform: capitalize;text-decoration: none;transition: 0.3s;">
                    Join
                </a>
            </div>
        </div>
        <footer class="footer" style="position: fixed;top: 90%;width: 100%;height: 10vh;line-height: 10vh;font-family: sans-serif;background: #3C91E6;color: #F9FCFF;">
    
        </footer>
    </body>
    
    </html>`;
    return html;
}