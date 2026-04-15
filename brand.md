Sen kıdemli bir full-stack web geliştirici, UI/UX tasarımcısı, Supabase mimarı ve kurumsal web sitesi uzmanısın.

Görevin:
ADY Grup için modern, premium, güven veren, mobil uyumlu, SEO uyumlu ve tamamen admin panelinden yönetilebilir bir kurumsal web sitesi sistemi tasarlamak.

Bu proje için referans alınacak yapı:
Kurumsal hizmet grubu mantığında, güçlü ana sayfa, hizmet detay sayfaları, hakkımızda, referanslar, galeri, blog, kariyer ve iletişim sayfalarından oluşan bir yapı.
Referans mantığı alınacak ama tasarım birebir kopyalanmayacak. Daha modern, daha temiz ve daha premium olacak.

==================================================
EN KRİTİK ZORUNLULUKLAR
==================================================

1. TÜM VERİLER SUPABASE ÜZERİNDE TUTULACAK
- Database: Supabase PostgreSQL
- Auth: Tek kullanıcı login yapısı
- Storage: Görseller ve medya dosyaları Supabase Storage üzerinde tutulabilir
- Form verileri ve içerikler Supabase tablolarında saklanmalı

2. ADMİN PANEL GİRİŞİ domain/admin OLMALI
- Admin login ekranı doğrudan /admin route’unda çalışmalı
- Eğer kullanıcı giriş yapmamışsa /admin sayfasında login formu görünmeli
- Giriş başarılıysa admin dashboard açılmalı
- Ayrı /admin/login sayfası zorunlu değil
- Ana beklenti: domain/admin tek giriş noktası olsun

3. TEK KULLANICI OLACAK
- Çoklu kullanıcı sistemi kurma
- Admin / Editor / Viewer gibi roller kullanma
- Kullanıcı yönetimi modülü oluşturma
- Sistemde yalnızca 1 adet yönetici hesabı olacak

4. GİRİŞ BİLGİLERİ
- Kullanıcı adı: admin
- Şifre: Adymehtap1.

ÖNEMLİ TEKNİK NOT:
- Bu bilgiler veritabanına güvenli şekilde seed edilerek oluşturulmalı
- Şifre düz metin olarak saklanmamalı
- Hash’lenmiş olarak saklanmalı
- Login sırasında kullanıcı adı + şifre kontrolü yapılmalı
- Session güvenli şekilde yönetilmeli
- Ancak yönetim mantığı tek kullanıcıya göre kurgulanmalı

5. İÇERİKLERİN TAMAMI ADMİN PANELDEN DEĞİŞTİRİLEBİLİR OLMALI
Bu zorunludur.
Özellikle:
- ana sayfa hero görselleri
- slider alanları
- hizmet kartları
- hizmet açıklamaları
- hakkımızda metinleri
- misyon / vizyon / değerler
- referans logoları
- galeri görselleri
- blog içerikleri
- kariyer ilanları
- iletişim bilgileri
- footer içerikleri
- SEO başlıkları
- meta description alanları
- CTA alanları
- buton metinleri
- buton linkleri
- hizmet sayfalarındaki tüm metinler
- hizmet sayfalarındaki tüm görseller
admin panelden değiştirilebilir olmak zorundadır.

Bu proje bir kere kurulacak, sonrasında site sahibi teknik bilgiye ihtiyaç duymadan panelden içerikleri değiştirecek.
Dolayısıyla hardcoded içerik kurma.
CMS mantığında, veri tabanından beslenen yapı kur.

==================================================
MARKA VE KURUMSAL YAPI
==================================================

Marka adı:
ADY Grup

Grup yapısı:
- ADY Danışmanlık
- ADY Güvenlik
- ADY Eğitim
- ADY İlk Yardım
- ADY Yangın ve Güvenlik Sistemleri
- ADY Temizlik
- ADY Catering

Kurumsal konumlandırma:
ADY Grup; danışmanlık, eğitim, güvenlik, ilk yardım, yangın ve güvenlik sistemleri, temizlik ve catering alanlarında kurumlara ve bireylere profesyonel, sürdürülebilir ve yüksek standartlı çözümler sunan kurumsal hizmet grubudur.

Kurumsal ton:
- resmi
- güven veren
- profesyonel
- net
- sade ama güçlü
- premium
- satış odaklı ama abartısız

==================================================
TASARIM YÖNÜ
==================================================

Tasarım dili:
- modern kurumsal
- premium
- temiz grid yapısı
- büyük hero alanları
- güçlü CTA alanları
- icon destekli hizmet blokları
- kart yapıları
- beyaz alan kullanımı dengeli
- mobil öncelikli responsive yapı
- kullanıcıyı teklif almaya yönlendiren net akış

Renk yönü:
- lacivert
- mavi
- beyaz
- gri
- logodaki kırmızı ve altın tonları vurgu rengi olarak kontrollü kullanılabilir

Genel his:
- güvenlik
- kurumsallık
- profesyonellik
- teknoloji
- sürdürülebilirlik

==================================================
TEKNİK STACK
==================================================

Tercih edilen yapı:
- Next.js 14+ veya güncel stabil sürüm
- TypeScript
- Tailwind CSS
- Shadcn/ui veya benzeri temiz component yapısı
- Supabase Database
- Supabase Storage
- Tek kullanıcı auth yapısı
- Zod + React Hook Form
- SEO uyumlu yapı
- performans odaklı render yaklaşımı

Dosya mimarisi temiz ve production-ready olsun.

==================================================
ADMİN PANEL MANTIĞI
==================================================

Admin panel route:
- /admin

Davranış:
- Giriş yapılmamışsa login formu göster
- Giriş yapılmışsa dashboard göster
- Logout işlemi olsun
- Tek kullanıcı olduğu için kullanıcı listesi ekranı olmasın

Admin panelde şu modüller olsun:
- Dashboard
- Genel Site Ayarları
- Ana Sayfa Yönetimi
- Hakkımızda Yönetimi
- Hizmetler Yönetimi
- Hizmet Alt Başlıkları Yönetimi
- Slider Yönetimi
- Referanslar Yönetimi
- Galeri Yönetimi
- Blog / Haber Yönetimi
- Kariyer Yönetimi
- Form Başvuruları
- İletişim Bilgileri Yönetimi
- Footer Yönetimi
- SEO Yönetimi
- Medya Yönetimi
- SSS Yönetimi
- CTA Alanları Yönetimi

OLMAYACAK MODÜLLER:
- çoklu kullanıcı yönetimi
- rol yönetimi
- kullanıcı izin yönetimi
- editor/viewer sistemi

==================================================
SUPABASE VERİ MANTIĞI
==================================================

Tüm ana içerikler Supabase tablolarında tutulmalı.

Örnek tablo yapıları:
- site_settings
- hero_slides
- pages
- services
- service_sections
- service_features
- faq_items
- gallery_items
- reference_items
- blog_posts
- blog_categories
- contact_infos
- form_submissions
- career_positions
- career_applications
- seo_meta
- statistic_items
- sector_items
- cta_blocks
- media_files
- admin_credentials veya admin_user

Tek kullanıcı yapısı için:
- admin_user tablosunda tek kayıt olabilir
veya
- environment + seed tabanlı tek admin kullanıcı mantığı kurulabilir

Ama sonuçta sistem tek kullanıcıya göre çalışmalı.

==================================================
LOGİN MANTIĞI
==================================================

Tek kullanıcı login sistemi kur:
- username input
- password input
- submit button
- yanlış girişte hata mesajı
- başarılı girişte /admin dashboard

Giriş bilgileri:
- username: admin
- password: Adymehtap1.

Güvenlik yaklaşımı:
- password hash’lenmiş saklanmalı
- session / cookie güvenli yönetilmeli
- brute force’a karşı basic koruma olabilir
- admin route korunmalı
- public kullanıcı admin ekranlarını görememeli

==================================================
SAYFA YAPISI
==================================================

Aşağıdaki sayfaları oluştur:

1. Ana Sayfa
2. Hakkımızda
3. Hizmetler Genel Sayfası
4. ADY Danışmanlık Detay Sayfası
5. ADY Güvenlik Detay Sayfası
6. ADY Eğitim Detay Sayfası
7. ADY İlk Yardım Detay Sayfası
8. ADY Yangın ve Güvenlik Sistemleri Detay Sayfası
9. ADY Temizlik Detay Sayfası
10. ADY Catering Detay Sayfası
11. Referanslar
12. Galeri
13. Blog / Haberler
14. Kariyer
15. İletişim
16. KVKK / Gizlilik / Çerez sayfaları
17. 404
18. /admin admin girişi ve dashboard

==================================================
ANA SAYFA BÖLÜMLERİ
==================================================

Ana sayfada şu alanlar olsun:
- üst bilgi barı
- header / menü
- hero slider
- kısa kurumsal tanıtım
- grup şirketleri / hizmet kartları
- neden ADY Grup?
- öne çıkan hizmetler
- istatistik alanı
- hizmet verilen sektörler
- referans logoları
- galeri önizleme
- blog önizleme
- kariyer çağrısı
- iletişim / teklif formu
- footer

Hero alanı:
- güçlü başlık
- açıklama
- Teklif Al butonu
- Hizmetleri İncele butonu
- görsel admin panelden değiştirilebilir
- slider varsa tüm slide’lar admin panelden düzenlenebilir

==================================================
HİZMET SAYFASI ŞABLONU
==================================================

Tüm hizmet sayfaları ortak mantıkta olsun:
- hero alanı
- hizmet özeti
- alt hizmetler
- hizmet verilen alanlar
- neden bizi tercih etmelisiniz
- süreç / çalışma modeli
- galeri
- SSS
- CTA
- hızlı teklif formu

ADY Güvenlik için özel alanlar:
- risk uzmanı yaklaşımı
- sabit nokta güvenliği
- devriye hizmetleri
- teknolojik entegrasyon
- belgelendirme ve kurumsal danışmanlık
- saha ve eğitim görselleri

ADY Eğitim için:
- kategori bazlı eğitim listeleri
- accordion / tab yapısı
- admin panelden eğitim kategorisi ve alt eğitim eklenebilir yapı

ADY İlk Yardım için:
- eğitim kapsamı
- kimler için uygundur
- sertifikasyon
- başvuru CTA’sı

ADY Yangın ve Güvenlik Sistemleri için:
- sistem tipleri
- teknik çözümler
- bakım ve servis
- keşif / projelendirme CTA

ADY Temizlik için:
- hizmet alanları
- hijyen ve kalite anlayışı
- özel temizlik uygulamaları
- sektör bazlı kullanım alanları

ADY Catering için:
- toplu yemek
- yerinde üretim
- taşımalı yemek
- organizasyon catering
- menü planlaması
- hijyen ve gıda güvenliği

==================================================
İÇERİK TEMELİ
==================================================

ADY Grup Hakkımızda omurgası:
ADY Grup, kurumların ve bireylerin ihtiyaçlarına yönelik yüksek standartlarda, özgün ve sonuç odaklı çözümler üretmek amacıyla kurulmuştur.
Grup bünyesinde; ADY Danışmanlık, ADY Güvenlik, ADY İlk Yardım, ADY Yangın ve Güvenlik Sistemleri, ADY Temizlik ve ADY Catering markalarıyla geniş bir hizmet yelpazesi sunulmaktadır.
Eğitim, danışmanlık, güvenlik ve destek hizmetleri alanlarında sahip olunan bilgi ve deneyim; çağdaş yöntemler, yenilikçi bakış açısı ve profesyonel hizmet anlayışıyla birleştirilerek kurumların gelişim ve sürdürülebilirlik süreçlerine katkı sağlanmaktadır.
Tüm hizmetler, her kurumun faaliyet alanı, risk yapısı ve beklentileri dikkate alınarak ihtiyaca özel şekilde planlanmaktadır.
Uzman kadro; kendi alanlarında deneyimli, mevzuata hâkim ve güçlü bir bilgi birikimine sahip profesyonellerden oluşmaktadır.
ADY Grup olarak; güven, kalite ve sürdürülebilirlik ilkeleri doğrultusunda, iş ortakları için uzun vadeli değer üreten güvenilir bir çözüm ortağı olmayı ilke ediniyoruz.

Misyon:
ADY Kurumları olarak; evrensel değerler, etik ilkeler ve bilimsel yaklaşımlar doğrultusunda eğitim, danışmanlık, güvenlik ve belgelendirme hizmetleri sunarak kurumların ve bireylerin sürdürülebilir başarısına katkı sağlamayı misyon ediniyoruz.

Vizyon:
ADY Kurumları olarak; profesyonel yönetim sistemleri, kalite yönetim sistemleri ve çağdaş insan kaynakları uygulamalarıyla desteklenen güçlü ve sürdürülebilir bir kurumsal yapı oluşturmayı hedefliyoruz.

Değerler:
- Katılımcı Yönetim Anlayışı
- Verimlilik
- Dürüstlük
- Sürekli Yenilik ve Gelişim
- Etik Değerlere Uygun Sistemler Geliştirmek
- Alanında Uzmanlık ve Öncülük
- Yasa ve Yönetmeliklere Bağlılık
- Güvenilirlik
- Yüksek Sorumluluk Duygusu

==================================================
ADMİN PANELDEN YÖNETİLECEK ALANLAR
==================================================

Her içerik tipi için şu alanları destekle:
- başlık
- kısa açıklama
- uzun açıklama
- görsel
- galeri
- sıra
- aktif / pasif
- slug
- meta title
- meta description
- open graph görseli
- buton metni
- buton linki

Formlar:
- teklif formu
- iletişim formu
- kariyer başvuru formu

Admin panelde:
- form başvuruları listelensin
- okunma durumu olsun
- not ekleme olsun
- temel filtreleme olsun
- dışa aktarma opsiyonel olabilir

==================================================
SEO VE PERFORMANS
==================================================

- temiz URL yapısı
- dinamik meta title / meta description
- open graph alanları
- sitemap
- robots.txt
- schema markup
- image optimization
- hızlı ilk yükleme
- mobil uyumluluk
- Core Web Vitals odaklı yaklaşım

==================================================
BEKLENEN ÇIKTI SIRASI
==================================================

Kodlamaya hemen başlama.
Önce şu sırayla çıktı ver:

1. Bu yeni gereksinimlere göre proje analizini güncelle
2. Önceki çoklu kullanıcı yapısını kaldırıp tek kullanıcı admin yapısına göre mimariyi yeniden kur
3. Prisma yerine Supabase merkezli veri mimarisi öner
4. /admin login + dashboard akışını detaylandır
5. Sayfa bazlı sitemap ver
6. Admin panel modül listesini ver
7. Supabase tablo yapısını ver
8. Tek admin kullanıcı seed mantığını ver
9. Sonra proje klasör yapısını ver
10. Son olarak örnek kod üretmeye başla

Önemli:
- Çoklu kullanıcı sistemi istemiyorum
- Sadece tek admin olacak
- /admin giriş ekranı olacak
- Supabase kullanılacak
- Tüm görseller ve açıklamalar panelden değiştirilecek
- Proje production-ready olsun
- Kod temiz, modüler ve sürdürülebilir olsun