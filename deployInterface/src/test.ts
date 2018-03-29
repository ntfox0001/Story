import * as Story from "./story/Story";

let fs = require("fs");

let storyMgr = new Story.StoryManager();
let configMgr = new Story.ConfigManager();

configMgr.initial("./deployinterface/storyConfig.json", "local");
storyMgr.initial();

let f1;//: story.FrontCover;

storyMgr.createFrontCover("从前有座山的故事", "从前有座山").then(fc => {
    f1 = fc;
    let aaa = fs.readFileSync("./deployinterface/story.txt", "utf-8");
    
    f1.getFirstStoryChain().createChild(aaa).then(() => {
        console.log("story end.");
    })
        .then(() => {
            let storyMgr2 = new Story.StoryManager();
            storyMgr2.initial();

            storyMgr2.restoreFrontCover(f1.getAddress()).then(fc => {
                console.log("name: " + fc.getName());

                console.log("content: " + fc.getFirstStoryChain().getContent());

                console.log("next content: " + fc.getFirstStoryChain().getChild(0).getContent());

            });
        });

});


