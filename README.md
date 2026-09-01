# Evently - Etkinlik Keşif ve Bilet Yönetim Uygulaması

Evently, kullanıcıların güncel etkinlikleri keşfetmesine, favorilerine eklemesine ve bu etkinlikler için QR kod destekli dijital biletler oluşturmasına olanak tanıyan kapsamlı bir mobil uygulamadır. 

Bu platform, modern mobil uygulama geliştirme standartlarına uygun olarak React Native teknolojileri kullanılarak baştan sona modüler bir yapıda geliştirilmiştir.

## Proje Özellikleri

Proje, esnek ve ölçeklenebilir bir yapı sunmak üzere aşağıdaki mimari ve fonksiyonel gereksinimleri karşılayacak şekilde tasarlanmıştır:

*   **Kimlik Doğrulama (Auth):** Kayıt olma, giriş yapma ve oturum bilgilerinin AsyncStorage üzerinden cihazda güvenle saklanması.
*   **Etkinlik Keşfi:** Güncel etkinliklerin listelenmesi, anlık arama (search) mekanizması ve kategorilere göre dinamik filtreleme yapısı.
*   **Favoriler:** Context API kullanılarak global state üzerinden yönetilen, kalıcı favori ekleme/çıkarma sistemi.
*   **Bilet ve QR Kod:** Bilet satın alma simülasyonu entegrasyonu; her bilet için benzersiz (unique) bir ID ve doğrulanabilir QR kod üretimi.
*   **Kullanıcı Arayüzü (UI/UX):** React Navigation (Stack + Tab) ile akıcı sayfa geçişleri, loading/error durumlarının (empty state) yönetimi ve dinamik tema (koyu/açık) desteği.

## Kullanılan Teknolojiler

Geliştirme sürecinde modern mobil uygulama mimarisine sadık kalınmış olup aşağıdaki teknolojiler kullanılmıştır:

*   **Frontend:** React Native (JavaScript)
*   **Navigasyon:** React Navigation (Bottom Tabs & Native Stack)
*   **State Yönetimi:** Context API 
*   **Yerel Depolama:** AsyncStorage
*   **API İletişimi:** Axios/Fetch (Tüm API çağrıları `services/api.js` katmanında modüler olarak soyutlanmıştır)

## Kurulum ve Çalıştırma

Projeyi lokal ortamda çalıştırmak için aşağıdaki adımların izlenmesi gerekmektedir:

1.  **Repoyu Klonlayın:**
    ```bash
    git clone [https://github.com/Sema-ince/Evently-App.git](https://github.com/Sema-ince/Evently-App.git)
    cd Evently-App
    ```

2.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    ```

3.  **Uygulamayı Başlatın:**
    ```bash
    npm start
    ```
    Terminalde oluşan QR kodu, mobil cihazdaki Expo Go uygulaması ile okutarak test ortamına erişim sağlanabilir.

## API ve Veri Modeli

Projede veri yönetimi esnek ve genişletilebilir bir yapıya oturtulmuştur. Ekran bileşenleri (components) doğrudan API çağrısı yapmamaktadır; tüm asenkron işlemler `services/api.js` üzerinden yönetilir.
Gelecekte gerçek bir backend servisi (örn. Laravel REST API) bağlandığında, arayüz kodlarında değişikliğe gidilmeden sadece bu servis katmanının güncellenmesi yeterli olacaktır.

**Temel Endpoint Şeması:**
*   `GET /events` : Tüm etkinlik listesini döner.
*   `GET /events/:id` : Belirli bir etkinliğin detaylarını döner.
*   `POST /tickets` : Yeni bilet oluşturur (simülasyon).
*   `GET /tickets/:userId` : Kullanıcıya ait aktif ve geçmiş biletleri listeler.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

---

# EN: Evently - Event Discovery and Ticket Management Application

Evently is a comprehensive mobile application that allows users to discover current events, add them to their favorites, and generate QR code-supported digital tickets for these events.

This platform has been developed from scratch with a modular architecture using React Native technologies, adhering to modern mobile app development standards.

## Project Features

The project is designed to meet the following architectural and functional requirements to provide a flexible and scalable structure:

*   **Authentication (Auth):** Registration, login, and secure storage of session data on the device via AsyncStorage.
*   **Event Discovery:** Listing current events, a real-time search mechanism, and a dynamic filtering structure by categories.
*   **Favorites:** A persistent favorite addition/removal system managed via global state using the Context API.
*   **Ticket and QR Code:** Ticket purchase simulation integration; generation of a unique ID and a verifiable QR code for each ticket.
*   **User Interface (UI/UX):** Smooth page transitions with React Navigation (Stack + Tab), management of loading/error states (empty states), and dynamic theme (dark/light) support.

## Technologies Used

During the development process, modern mobile application architecture was strictly followed, and the following technologies were utilized:

*   **Frontend:** React Native (JavaScript)
*   **Navigation:** React Navigation (Bottom Tabs & Native Stack)
*   **State Management:** Context API 
*   **Local Storage:** AsyncStorage
*   **API Communication:** Axios/Fetch (All API calls are abstracted modularly within the `services/api.js` layer)

## Installation and Setup

To run the project in a local environment, the following steps should be followed:

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/Sema-ince/Evently-App.git](https://github.com/Sema-ince/Evently-App.git)
    cd Evently-App
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Start the Application:**
    ```bash
    npm start
    ```
    You can access the test environment by scanning the QR code generated in the terminal with the Expo Go application on your mobile device.

## API and Data Model

Data management in the project is built on a flexible and extensible structure. Screen components do not make direct API calls; all asynchronous operations are managed through `services/api.js`. In the future, when a real backend service (e.g., Laravel REST API) is connected, it will be sufficient to update only this service layer without making changes to the interface codes.

**Basic Endpoint Schema:**
*   `GET /events` : Returns the entire event list.
*   `GET /events/:id` : Returns the details of a specific event.
*   `POST /tickets` : Creates a new ticket (simulation).
*   `GET /tickets/:userId` : Lists the active and past tickets belonging to the user.
  
