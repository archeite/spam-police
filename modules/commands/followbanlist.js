class FollowBanList {

    constructor(){}

    async run ({client, roomId, event, mxid, blacklist}, {offset, contentByWords, config}){

        //make sure the user has ban permissions before adding banlist
        if ( ! await client.userHasPowerLevelForAction(event["sender"], roomId, "ban") ) {

            client.sendNotice(roomId, "❌ | You don't have sufficent permission. (need ban permission)")
            
            return
        
        }

        //make sure the bot has ban permissions before adding banlist
        if ( ! await client.userHasPowerLevelForAction(mxid, roomId, "ban") ) {

            client.sendNotice(roomId, "❌ | I don't have sufficent permission. (need ban permission)")
            
            return
        
        }

        //get already set banlists
        let currentBanlists = config.getConfig(roomId, "banlists")

        //if there is none, give it something to prevent erroring
        if(!currentBanlists){ currentBanlists = [] }

        //if the user wants a list
        if (contentByWords[offset+1].toLowerCase() == "list") {

            client.sendNotice(roomId, "banlist list here")

            return

        }

        //grep out the room indicated by the user
        let joinroom = event["content"]["body"].split(" ")[1+offset]

        //evaluate if its a valid alias
        client.resolveRoom(joinroom).then(async joinroomid => {

            //check blacklist for a blacklisted reason
            let blReason = blacklist.match(joinroomid)

            //if there is a reason that means the room was blacklisted
            if(blReason) {

                //send error
                client.sendHtmlNotice(roomId, "❌ | The bot was blacklisted from this room for reason <code>" + blReason + "</code>.")

                //dont continue trying to join
                return

            }

            //if already following banlist, there is nothing to do
            if( currentBanlists.includes(joinroomid) ){

                client.sendNotice(roomId, "♻️ | Already following this banlist.")

                return

            }

            //if the bot is already joined to the banlist, no need to try to join
            if((await client.getJoinedRooms()).includes(joinroomid)){

                //add the new banlist to the banlists
                currentBanlists.push(joinroomid)

                //set the config
                config.setConfig(roomId, "banlists", currentBanlists, err => {

                    client.sendNotice(roomId, err)

                })

                return;

            }

            //deduce possible servers with the required information to join into the room
            let aliasServer = joinroom.split(":")[1]
            let senderServer = event["sender"].split(":")[1]
            let botServer = mxid.split(":")[1]

            //try to join
            client.joinRoom(joinroomid, [aliasServer, senderServer, botServer, "matrix.org"]).then(() => {

                //greeting message
                let greeting = "Greetings! I am brought here by " + event["sender"] + ", bot by @jjj333:pain.agency (pls dm for questions). " + 
                "I am joining this room purely to read from the banlist, and as such will default to muted mode, however this can be changed with [prefix]mute. " + 
                "For more information please visit https://github.com/jjj333-p/spam-police"

                //add the new banlist to the banlists
                currentBanlists.push(joinroomid)

                //set the config
                config.setConfig(roomId, "banlists", currentBanlists, err => {

                    client.sendNotice(roomId, err)

                })

                //try to send the greeting
                client.sendNotice(joinroomid, greeting).finally(() => {

                    //confirm joined and can send messages
                    client.sendNotice(roomId, "✅ | successfully joined banlist!")

                }).catch(err => {})

            }).catch(err => {

                //throw error about joining room
                client.sendHtmlNotice(roomId, "❌ | I ran into the following error while trying to join that room:<blockquote>"  + JSON.stringify(err.body, null, 2) + "</blockquote>")

            })

        }).catch(err => {

            //throw error about invalid alias
            client.sendHtmlNotice(roomId, "❌ | I ran into the following error while trying to resolve that room ID:<blockquote>" + err.message + "</blockquote>")

        })
        

    }

}

export { FollowBanList }