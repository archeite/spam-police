# Spam Police

A [Matrix](https://matrix.org/) bot to monitor and respond to investment scam spamming across the Matrix platform, for example in rooms with a permanently offline admin.

## Discussion

- Matrix Space: [`#spam-police:matrix.org`](https://matrix.to/#/#spam-police:matrix.org)
- Support Room: [`#anti-scam-support:matrix.org`](https://matrix.to/#/#anti-scam-support:matrix.org)
- Update and Announcement Room: [`#spam-police-rss:matrix.org`](https://matrix.to/#/#spam-police-rss:matrix.org)
- General Moderation Automation Ideas Room: [`#mod-ideas:matrix.org`](https://matrix.to/#/#mod-ideas:matrix.org)

## Inviting the bot

You can use the instance of the bot I host (preferred), `@anti-spam:matrix.org`, or you can selfhost below. Do note that the bot does not currently support encrypted rooms.

- You can run `+invite [room alias or id]` in a room that the bot is in and if it is able to join the room it will. If you need a channel to run this command, feel free to join `#anti-scam-cmds:matrix.org`.

My instance of the bot logs the scams it finds to `#jjj-tg-scams:matrix.org`. 

## Self-hosting

### Requirements

- [NodeJS](https://nodejs.org/en/download/package-manager/)
	- [Install from package manager](https://nodejs.org/en/download/package-manager/)
	- [NodeJS Installer](https://nodejs.org/en/download/)
- [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
	- [Installation Documentation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Instructions

1. Download the latest stable version located in the [branches](https://github.com/jjj333-p/spam-police/branches)
	- Stable branches are formatted as `stable-vX.X.X-(version-X,-minor-release-X)`
	- Downloading the branch as a ZIP and extracting it is recommended
		- Using git: `git clone --branch <branch> --single-branch https://github.com/archeite/spam-police.git`

> **Note**
> For a development version, you download from the `master` branch instead of the stable branch. The git command is shown below
> ```bash
> $ git clone --branch master --single-branch https://github.com/archeite/spam-police.git
> ```
2. Create a folder named `db` in the same folder as `index.js`

3. In the `db` folder you just created, make a file called `login.txt`

4. In `login.txt` put the login information in the following format:
```
homeserver
login token
channel to log discovered telegram scams
command channel
```
For example, an account on matrix.org would be
```
https://matrix.org
[redacted]
!xWGMKuBpJrtGDSfmaF:matrix.org
!dSGCuhsxXDDJxhJxJH:matrix.org
```
Do note that some homeservers require you to use https://matrix. before the homeserver domain.

5. In the same folder as index.js make an empty textfile called bot.json. This appears to be how the matrix bot sdk saves the sync token and stuff, however it seems to work just fine if I delete this so maybe the code could be changed around to not require it?

6. Run npm install to install the node dependencies to run the bot

7. The bot can now be launched using node index.js or node . depending on which you prefer
