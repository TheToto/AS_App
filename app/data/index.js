import axios from 'axios';
import populate from './dataGenerator'
import users from './raw/users'
import articles from './raw/articles'
import notifications from './raw/notifications'
import conversations from './raw/conversations'
import cards from './raw/cards'
import _ from 'lodash'
import { UIConstants } from '../config/appConstants';


class DataProvider {

  getUser(id = 1) {
    return _.find(users, x => x.id == id);
  }

  getUsers() {
    return users;
  }

  getNotifications() {
    return notifications;
  }

  getArticles(type = 'article') {
    return _.filter(articles, x => x.type == type);
  }

  getArticle(id) {
    return _.find(articles, x => x.id == id);
  }


  getConversation(userId = 1) {
    return _.find(conversations, x => x.withUser.id == userId);
  }

  getChatList() {
    return conversations;
  }

  getComments(postId = 1) {
    return this.getArticle(postId).comments;
  }

  getCards() {
    return cards;
  }

  populateData() {
    populate();
  }

  sendMessage(text) {
    if (!UIConstants.isConnect()) {
     alert("Vous n'êtes pas connecté !");
     return;
    }
    console.log(UIConstants.getCookie());
    let newly_added_data = {
     "author": {
       "avatar": "https://www.animationsource.org/sites_content/lady_the_tramp/upload/avatars/nakou_1504949182.jpg",
       "name": "Thetoto",
       "id": "2886"
     },
     "text": text,
     "color": "#FFA23F",
     "time": "1s",
     "id": Math.random()
   };
 
   axios.request({
     method: "post",
     url: "http://192.168.1.72:5000/chat/fr/" + UIConstants.getCurrentSite() + "/chat",
     data: {
       'message': text, 
       'cookie': UIConstants.getCookie()
     }
   }).then(res => {
     console.log(res);
   });
    
  }

  recup (that) {
    console.log('call recup ' + "http://192.168.1.15:5000/chat/fr/" + UIConstants.getCurrentSite() + "/chat");
    axios.get("http://192.168.1.15:5000/chat/fr/" + UIConstants.getCurrentSite() + "/chat")
    .then(function (response) {
      console.log('act chat' + UIConstants.getCurrentSite()); 
      that.setState({
        data: response.data.messages
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export let data = new DataProvider();