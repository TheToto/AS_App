import {Platform} from 'react-native';
import * as SiteTheme from '../config/sitetheme/index';

export class UIConstants {

  static sites_list = [
    { text: "Balto", alias:'balto', theme:SiteTheme.BaltoTheme, icon: "https://www.animationsource.org/sites_content/balto/img_layout/blizzard/site_asource_icon.jpg", badge:"https://www.animationsource.org/board/images/post_it_balto.gif", iconColor: "#f42ced" },
    { text: "Roi Lion", alias:"roi_lion", theme:SiteTheme.RoiLionTheme, icon: "https://www.animationsource.org/sites_content/lion_king/img_layout/jungle_hakuna_matata/site_asource_icon.jpg", badge:"https://www.animationsource.org/board/images/post_it_roilion.gif", iconColor: "#2c8ef4" },
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
    { text: "Zootopie", alias:"zootopia", icon: "https://www.animationsource.org/sites_content/zootopie/img_layout/entrez_dans_zootopia_/site_asource_icon.png", badge : "https://www.animationsource.org/forum/images/post_it_zootopia.png", iconColor: "#ea943b" },
    { text: "Lilo & Stitch", alias:"lilo_stitch", icon: "https://www.animationsource.org/sites_content/lilo_stitch/img_layout/sous_le_soleil_d_hawai/site_asource_icon.png", badge: "https://www.animationsource.org/forum/images/postit_stitch.png", iconColor: "#ea943b" },
    { text: "Hub", alias:"hub", icon: "https://www.animationsource.org/sites_content/lilo_stitch/img_layout/sous_le_soleil_d_hawai/site_asource_icon.png", badge: "https://www.animationsource.org/images/shared/BANNER-AS.png", iconColor: "#ea943b" }
  ];


  static AppbarHeight = Platform.OS === 'ios' ? 44 : 56;
  static StatusbarHeight = Platform.OS === 'ios' ? 20 : 0;
  static HeaderHeight = UIConstants.AppbarHeight + UIConstants.StatusbarHeight;

  static currentSite = UIConstants.sites_list[0];
  static currentChatType = 'chat';

  static getCurrentSite() {
    return UIConstants.currentSite.alias;
  }

  static getCurrentSiteObject() {
    return UIConstants.currentSite;
  }

  static getCurrentSiteBadge() {
    return UIConstants.currentSite.badge;
  }
  
  static getCurrentSiteName() {
    return UIConstants.currentSite.text;
  }
  static setCurrentSite(site) {
    UIConstants.currentSite = site;
  }
  

  static cookie = "";
  static success = false;
  static pseudo = "User";
  static avatar = "https://www.animationsource.org/images/shared//no_avi_fr.jpg"
  static id = 1;
  static getCookie() {
    return UIConstants.cookie;
  }
  static isConnect() {
    return UIConstants.success;
  }

  // CONTAINS .HTML : &numg=id 
  static decode_AS_URL(url, nav) {
    let reg = /.org\/([^/]*)\/([^/]*)\/?([^/]*)\/?([^/]*)\/?([^/]*)/
    let res = reg.exec(url);
    // 1 : site, 2 : lang, 3: type, 4: args (if no 4 : main page) (and no 3 : home page...)
    // IF 5; 1 : site,2 : lang, 3: type, 4: NOTHING, 5 : different args.
    if (res == undefined) {
      alert('Pas supporté ou pas un lien vers AS... Je t\'ouvre le navigateur.');
      return;
    }
    if (res[2] != 'fr') {
      alert('Seul le francais est supporté pour le moment... Je t\'ouvre le navigateur.');
      return;
    }
    let navtype;
    let params = [];
    if (res[5] == undefined  || res[5] == "") {
      let reg = /[(\?|\&)]([^=]+)\=([^&#]+)/g

      params = reg.exec(res[4]).slice(1);
    } else {
      let reg = /([0-9]+).html[(\?|\&)]([^=]+)\=([^&#]+)/g
      params = reg.exec(res[4]);
      params[0] = 'numg';
    }
    
    UIConstants.setCurrentSite(res[1]);
    switch(res[3]) {
      case "chars":
        alert('Unsupported');
        break;
      case 'readmp':
        break;
      case 'comments':
        break;
      default:
        break;
    }

    nav.navigate('SendMp');
    //Expo.WebBrowser.openBrowserAsync(url);
  }
}

