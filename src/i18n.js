import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  tr: {
    translation: {
		"Because watching content legally is boring": "Çünkü içeriği yasal olarak izlemek sıkıcı",
		"Check it out on GitHub": "GitHub kaynak kodu",
		"Choose your movie": "Film seçin",
		"Choose your show": "Dizi seçin",
		"Continue watching": "İzlemeye devam et",
		"Could not find that movie": "Böyle bir film bulunamadı",
		"Could not find that show": "Böyle bir dizi bulunamadı",
		"Episode": "Bölüm",
		"Failed to find movie. Please try searching below.": "Film bulunamadı. Aşağıda aramayı deneyin.",
		"Failed to get stream": "Akış alınamadı",
		"Failed to watch movie": "Film izlenemedi",
		"Getting stream for": "Akış alınıyor:",
		"Join the Discord": "Discord'a katılın",
		"Loading episode...": "Bölüm yükleniyor...",
		"Movie": "Film",
		"Not found:": "Bulunamadı:",
		"Our content provider is currently offline, apologies.": "İçerik sağlayıcımız şu anda çevrimdışı, özür dileriz.",
		"Return to home": "Ana sayfaya dön",
		"Search": "Ara",
		"Searching for movie": "Film aranıyor",
		"Searching for show": "Dizi aranıyor",
		"Season": "Sezon",
		"Streaming...": "Akış yapılıyor...",
		"TV Show": "TV Dizisi",
		"Watch movie": "Film izle",
		"Watch show": "Dizi izle",
		"Watch": "İzle",
		"What do you wanna watch?": "Ne izlemek istiyorsun?",
		"Whoops, there are a few movies like that": "Bunun gibi birkaç film var",
		"Whoops, there are a few shows like that": "Bunun gibi birkaç dizi var",
		"movies": "filmler",
		"shows": "diziler",
    }
  },
};
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: navigator.language,
    interpolation: {
      escapeValue: false
    }
  });
  
export default i18n;
