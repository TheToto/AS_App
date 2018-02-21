import {FontIcons, FontAwesome} from '../../assets/icons';
import * as Screens from '../../screens/index';
import _ from 'lodash';
import { Message } from '../../screens/messaging/mp';
import { Search } from '../../screens/other/search';
import { sendMp } from '../../screens/messaging/sendmp';
import { Artist } from '../../screens/articles/artist';
import { Artist2 } from '../../screens/articles/artist2';
import { news } from '../../screens/articles/news';

export const sites_list = [
  { text: "Balto", alias:'balto', icon: "https://www.animationsource.org/sites_content/balto/img_layout/blizzard/site_asource_icon.jpg", badge:"https://www.animationsource.org/board/images/post_it_balto.gif", iconColor: "#f42ced" },
  { text: "Roi Lion", alias:"roi_lion", icon: "https://www.animationsource.org/sites_content/lion_king/img_layout/jungle_hakuna_matata/site_asource_icon.jpg", badge:"https://www.animationsource.org/board/images/post_it_roilion.gif", iconColor: "#2c8ef4" },
  { text: "Superbaloo", alias:"super_baloo", icon: "https://www.animationsource.org/sites_content/talespin/img_layout/talespin_green/site_asource_icon.png", badge: "https://www.animationsource.org/board/images/post_it_talespin.gif", iconColor: "#2c8ef4" },
  { text: "La Princesse et la Grenouille", alias:"princesse_grenouille", icon: "https://www.animationsource.org/sites_content/princess_the_frog/img_layout/le_restau_restaure/site_asource_icon.png", badge: "https://www.animationsource.org/forum/images/post_it_princess.gif", iconColor: "#ea943b" },
  { text: "Charlie", alias:"charlie", icon: "https://www.animationsource.org/sites_content/all_dogs_go_to_heaven/img_layout/2012_charlie/site_asource_icon.png", badge : "https://www.animationsource.org/forum/images/post_it_adgth.gif", iconColor: "#ea943b" },
  { text: "La Belle et le Clochard", alias:"belle_clochard", icon: "https://www.animationsource.org/sites_content/lady_the_tramp/img_layout/sunrise/site_asource_icon.jpg", badge : "https://www.animationsource.org/forum/images/postit_lady.png", iconColor: "#ea943b" },
  { text: "Les Aristochats", alias:"aristochats", icon: "https://www.animationsource.org/sites_content/the_aristocats/img_layout/parisaristo/site_asource_icon.jpg", badge : "https://www.animationsource.org/forum/images/postit_arist.png", iconColor: "#ea943b" },
  { text: "Mulan", alias:"mulan", icon: "https://www.animationsource.org/sites_content/mulan/img_layout/terre_des_dragons/site_asource_icon.jpg", badge : "https://www.animationsource.org/forum/images/postit_mulan.png", iconColor: "#ea943b" },
  { text: "Anastasia", alias:"anastasia", icon: "https://www.animationsource.org/sites_content/anastasia/img_layout/theme_d_anastasia/site_asource_icon.png", badge : "https://www.animationsource.org/forum/images/postit_anastasia.png", iconColor: "#ea943b" },
  { text: "Bambi", alias:"bambi", icon: "https://www.animationsource.org/sites_content/bambi/img_layout/bambi_forest/site_asource_icon.jpg", badge : "https://www.animationsource.org/forum/images/postit_bambi.png", iconColor: "#ea943b" },
  { text: "Raiponce", alias:"raiponce", icon: "https://www.animationsource.org/sites_content/raiponce/img_layout/tour_de_raiponce/site_asource_icon.png", badge : "https://www.animationsource.org/forum/images/postit_tangled.png", iconColor: "#ea943b" },
  { text: "Frère des Ours", alias:"frere_des_ours", icon: "https://www.animationsource.org/sites_content/brother_bear/img_layout/bear_fur/site_asource_icon.jpg", badge : "https://www.animationsource.org/forum/images/postit_brother.png", iconColor: "#ea943b" },
  { text: "Spirit", alias:"spirit", icon: "https://www.animationsource.org/sites_content/spirit/img_layout/plaines_du_cimarron/site_asource_icon.jpg", badge : "https://www.animationsource.org/forum/images/post_it_spirit.gif", iconColor: "#ea943b" },
  { text: "Cats Don't Dance", alias:"danny", icon: "https://www.animationsource.org/sites_content/cats_don_t_dance/img_layout/arrivee_a_hollywood_/site_asource_icon.jpg", badge : "https://www.animationsource.org/forum/images/postit_cats.png", iconColor: "#ea943b" },
  { text: "Oliver et compagnie", alias:"oliver", icon: "https://www.animationsource.org/sites_content/oliver_company/img_layout/2012_le_nouveau_new_york_/site_asource_icon.jpg", badge : "https://www.animationsource.org/forum/images/postit_oliver.png", iconColor: "#ea943b" },
  { text: "Rio", alias:"rio", icon: "https://www.animationsource.org/sites_content/rio/img_layout/2012_nouveau_plumage_/site_asource_icon.png", badge : "https://www.animationsource.org/forum/images/postit_rio.png", iconColor: "#ea943b" },
  { text: "Le livre de la Jungle", alias:"livre_jungle", icon: "https://www.animationsource.org/sites_content/jungle_book/img_layout/jungle_intuituine/site_asource_icon.png", badge : "https://www.animationsource.org/forum/images/postit_jb.png", iconColor: "#ea943b" },
  { text: "Les 101 dalmatiens", alias:"dalmatiens", icon: "https://www.animationsource.org/sites_content/101_dalmatians/img_layout/les_101_intuituines/site_asource_icon.jpg", badge : "https://www.animationsource.org/forum/images/postit_101.png", iconColor: "#ea943b" },
  { text: "La Belle et la Bête", alias:"belle_bete", icon: "https://www.animationsource.org/sites_content/la_belle_et_la_bete/img_layout/la_prairie_de_philibert_/site_asource_icon.png", badge : "https://www.animationsource.org/forum/images/postit_beauty.png", iconColor: "#ea943b" },
  { text: "Rox et Rouky", alias:"rox_rouky", icon: "https://www.animationsource.org/sites_content/the_fox_and_the_hound/img_layout/le_tonneau_de_chef_/site_asource_icon.png", badge : "https://www.animationsource.org/forum/images/postit_fox.png", iconColor: "#ea943b" },
  { text: "L'Age de Glace", alias:"age_glace", icon: "https://www.animationsource.org/sites_content/age_de_glace/img_layout/l_age_de_glace/site_asource_icon.png", badge : "https://www.animationsource.org/forum/images/postit_iceage.png", iconColor: "#fa213b" },
  { text: "Dragons", alias:"dragons", icon: "https://www.animationsource.org/sites_content/dragons/img_layout/berk/site_asource_icon.jpg", badge : "https://www.animationsource.org/forum/images/postit_httyd.png", iconColor: "#ea943b" },
  { text: "Rebelle", alias:"rebelle", icon: "https://www.animationsource.org/sites_content/rebelle/img_layout/rebelle/site_asource_icon.png", badge : "https://www.animationsource.org/forum/images/posit_rebelle.png", iconColor: "#ea943b" },
  { text: "Brisby et le secret de NIMH", alias:"brisby", icon: "https://www.animationsource.org/sites_content/the_secret_of_nimh/img_layout/le_monde_de_brisby/site_asource_icon.png", badge : "https://www.animationsource.org/forum/images/postit_nimh.png", iconColor: "#ea943b" },
  { text: "La Planète au Trésor", alias:"planete_tresor", icon: "https://www.animationsource.org/sites_content/la_planete_au_tresor/img_layout/test_style/site_asource_icon.png", badge : "https://www.animationsource.org/forum/images/postit_treasure.png", iconColor: "#ea943b" },
  { text: "La Reine des Neiges", alias:"reine_neiges", icon: "https://www.animationsource.org/sites_content/la_reine_des_neiges/img_layout/le_coeur_de_glace/site_asource_icon.png", badge : "https://www.animationsource.org/forum/images/postit_frozen.png", iconColor: "#ea943b" },
  { text: "Tarzan", alias:"tarzan", icon: "https://www.animationsource.org/sites_content/tarzan/img_layout/dans_la_jungle/site_asource_icon.png", badge : "https://www.animationsource.org/forum/images/postit_tarzan.png", iconColor: "#ea943b" },
  { text: "My Little Pony", alias:"petit_poney", icon: "https://www.animationsource.org/sites_content/my_little_poney/img_layout/dans_le_monde_d_equestria/site_asource_icon.png", badge : "https://www.animationsource.org/forum/images/postit_mlp.png", iconColor: "#ea943b" },
  { text: "Volt", alias:"volt", icon: "https://www.animationsource.org/sites_content/volt/img_layout/i_need_a_hero_/site_asource_icon.png", badge : "https://www.animationsource.org/forum/images/postit_bolt.png", iconColor: "#ea943b" },
  { text: "Zootopie", alias:"zootopia", icon: "https://www.animationsource.org/sites_content/zootopie/img_layout/entrez_dans_zootopia_/site_asource_icon.png", badge : "https://www.animationsource.org/forum/images/post_it_zootopia.png", iconColor: "#ea943b" }
];

export const MyRoutes = [
  {
    id: 'Login1',
    title: 'Login',
    icon: FontIcons.login,
  },
  {
    id: 'GridV2',
    title: 'Site List',
    icon: FontIcons.other,
  },
  {
    id: 'Feed',
    title: 'News',
    screen: Screens.Feed,
    icon: FontAwesome.news
  },
  {
    id: 'ProfileV2',
    title: 'Mon Profil',
    icon: FontIcons.profile,
  },
  {
    id: 'ChatList',
    title: 'MPs',
    icon: FontIcons.mail,
  },
  {
    id: 'Search',
    title: 'Search',
    icon: FontIcons.navigation,
  },
  { 
    id: 'Themes',
    title: 'Themes',
    icon: FontIcons.theme,
  },
  {
    id: 'Articles2',
    title: 'Fan Images',
    params: {type:'fanimage'},
    icon: FontAwesome.fanimage,
  },
  {
    id: 'Articles2',
    title: 'Fan Arts',
    params: {type:'fanart'},
    icon: FontAwesome.fanart
  },
  {
    id: 'Articles3',
    title: 'Fanfics',
    params: {type:'fanfic'},
    icon: FontAwesome.fanfic,
  },
  {
    id: 'Articles3',
    title: 'Fan Musiques',
    params: {type:'fanmusic'},
    icon: FontAwesome.music
  },
  {
    id: 'Articles3',
    title: 'Fan Vidéos',
    params: {type:'fanvideo'},
    icon: FontAwesome.video
  },
  {
    id: 'Articles3',
    title: 'Livres-Jeux',
    params: {type:'fangbook'},
    icon: FontAwesome.fangbook
  },
]

export const MainRoutes = [
  {
    id: 'LoginMenu',
    title: 'Auth',
    icon: FontIcons.login,
    screen: Screens.LoginMenu,
    children: [
      {
        id: 'Login1',
        title: 'Login V1',
        screen: Screens.LoginV1,
        children: []
      },
      {
        id: 'Login2',
        title: 'Login V2',
        screen: Screens.LoginV2,
        children: []
      },
      {
        id: 'SignUp',
        title: 'Sign Up',
        screen: Screens.SignUp,
        children: []
      },
      {
        id: 'password',
        title: 'Password Recovery',
        screen: Screens.PasswordRecovery,
        children: []
      },
    ]
  },
  {
    id: 'SocialMenu',
    title: 'Social',
    icon: FontIcons.profile,
    screen: Screens.SocialMenu,
    children: [
      {
        id: 'ProfileV1',
        title: 'User Profile V1',
        screen: Screens.ProfileV1,
        children: []
      },
      {
        id: 'ProfileV2',
        title: 'User Profile V2',
        screen: Screens.ProfileV2,
        children: []
      },
      {
        id: 'ProfileV3',
        title: 'User Profile V3',
        screen: Screens.ProfileV3,
        children: []
      },
      {
        id: 'ProfileSettings',
        title: 'Profile Settings',
        screen: Screens.ProfileSettings,
        children: []
      },
      {
        id: 'Notifications',
        title: 'Notifications',
        screen: Screens.Notifications,
        children: []
      },
      {
        id: 'Contacts',
        title: 'Contacts',
        screen: Screens.Contacts,
        children: []
      },
      {
        id: 'Feed',
        title: 'Feed',
        screen: Screens.Feed,
        children: []
      },
    ]
  },
  {
    id: 'ArticlesMenu',
    title: 'Articles',
    icon: FontIcons.article,
    screen: Screens.ArticleMenu,
    children: [
      {
        id: 'Articles1',
        title: 'Article List V1',
        screen: Screens.Articles1,
        children: []
      },
      {
        id: 'Articles2',
        title: 'Article List V2',
        screen: Screens.Articles2,
        children: []
      },
      {
        id: 'Articles3',
        title: 'Article List V3',
        screen: Screens.Articles3,
        children: []
      },
      {
        id: 'Articles4',
        title: 'Article List V4',
        screen: Screens.Articles4,
        children: []
      },
      {
        id: 'Artist',
        title: 'Artiste',
        screen: Artist,
        children: []
      },
      {
        id: 'Artist2',
        title: 'Artiste (alt)',
        screen: Artist2,
        children: []
      },
      {
        id: 'Blogposts',
        title: 'Blogposts',
        screen: Screens.Blogposts,
        children: []
      },
      {
        id: 'Article',
        title: 'Article View',
        screen: Screens.Article,
        children: []
      },
      {
        id: 'news',
        title: 'news',
        screen: news,
        children: []
      }
    ]
  },
  {
    id: 'MessagingMenu',
    title: 'Messaging',
    icon: FontIcons.mail,
    screen: Screens.MessagingMenu,
    children: [
      {
        id: 'Chat',
        title: 'Chat',
        screen: Screens.Chat,
        children: []
      },
      {
        id: 'ChatList',
        title: 'Chat List',
        screen: Screens.ChatList,
        children: []
      },
      {
        id: 'Message',
        title: 'Message',
        screen: Message,
        children: []
      },
      {
        id: 'SendMp',
        title: 'Send MP',
        screen: sendMp,
        children: []
      },
      {
        id: 'Comments',
        title: 'Comments',
        screen: Screens.Comments,
        children: []
      }
    ]
  },
  {
    id: 'DashboardsMenu',
    title: 'Dashboards',
    icon: FontIcons.dashboard,
    screen: Screens.DashboardMenu,
    children: [{
      id: 'Dashboard',
      title: 'Dashboard',
      screen: Screens.Dashboard,
      children: []
    },]
  },
  {
    id: 'WalkthroughMenu',
    title: 'Walkthroughs',
    icon: FontIcons.mobile,
    screen: Screens.WalkthroughMenu,
    children: [{
      id: 'Walkthrough',
      title: 'Walkthrough',
      screen: Screens.WalkthroughScreen,
      children: []
    }]
  },
  {
    id: 'EcommerceMenu',
    title: 'Ecommerce',
    icon: FontIcons.card,
    screen: Screens.EcommerceMenu,
    children: [
      {
        id: 'Cards',
        title: 'Cards',
        icon: FontIcons.card,
        screen: Screens.Cards,
        children: []
      },
      {
        id: 'AddToCardForm',
        title: 'Add Card Form',
        icon: FontIcons.addToCardForm,
        screen: Screens.AddToCardForm,
        children: []
      },

    ]
  },
  {
    id: 'NavigationMenu',
    icon: FontIcons.navigation,
    title: 'Navigation',
    screen: Screens.NavigationMenu,
    children: [
      {
        id: 'GridV1',
        title: 'Grid Menu V1',
        screen: Screens.GridV1,
        children: []
      },
      {
        id: 'GridV2',
        title: 'Grid Menu V2',
        screen: Screens.GridV2,
        children: []
      },
      {
        id: 'List',
        title: 'List Menu',
        screen: Screens.ListMenu,
        children: []
      },
      {
        id: 'Side',
        title: 'Side Menu',
        action: 'DrawerOpen',
        screen: Screens.SideMenu,
        children: []
      }
    ]
  },
  {
    id: 'OtherMenu',
    title: 'Other',
    icon: FontIcons.other,
    screen: Screens.OtherMenu,
    children: [
      {
        id: 'Settings',
        title: 'Settings',
        screen: Screens.Settings,
        children: []
      },
      {
        id: 'Search',
        title: 'Search',
        screen: Search,
        children: []
      }
    ]
  },
  { 
    id: 'Themes',
    title: 'Themes',
    icon: FontIcons.theme,
    screen: Screens.Themes,
    children: []
  },
];

let menuRoutes = _.cloneDeep(MainRoutes);
menuRoutes.unshift({
  id: 'GridV2',
  title: 'Start',
  screen: Screens.GridV2,
  children: []
},);

export const MenuRoutes = menuRoutes;