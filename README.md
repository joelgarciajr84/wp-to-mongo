# WordPress to Mongo
Save a remote WordPress post into your local MongoDB.
Works in WordPress (4.7 or above) or any WordPress installation which have WP-REST-API enabled.

## Install

```bash
git clone https://github.com/joelgarciajr84/wp-to-mongo
```
```bash
cd wp-to-mongo
```

```bash
npm install
```

## Run

```bash
nodejs server.js
```
Will be running at your browser at port 8484

## Use
### You have to send 2 arguments
1. First one is 'siteurl' (http://mybeautifulwebsite.com/wp-json/wp/v2/posts)
2. Second is 'postid' which is the post id you want to retrieve and save at your local MongoDB
3. Full sample: http://localhost:8484/?siteurl=http://mybeautifulwebsite.com/wp-json/wp/v2/posts&postid=5068
4. If everything works fine you should see this message:

```js
{
    "POST": "5068",
    "STATUS": "Saved successfully"
}
```
## Contexts of application:
1. Remote Web crawler
2. Backup
3. Data Mining - BigData etc.
4. There is no delay in the requests, so you can write an application that sends the ids in a loop to be checked and saved in the database.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
