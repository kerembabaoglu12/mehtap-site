ADY Grup projesini mevcut haliyle yamalama. Siteyi ve admin paneli modern, premium ve çalışan bir yapıya dönüştür.

ÖNCELİKLER

1) ADMİN PANELİ GERÇEKTEN ÇALIŞSIN
Şu an admin ekranı var ama ekleme/düzenleme düzgün çalışmıyor. Bunu düzelt.

Admin route yapısı:
- /admin → dashboard
- /admin/settings → Genel Ayarlar
- /admin/services → Hizmetler
- /admin/submissions → Form Başvuruları
- gerekiyorsa ek olarak:
  /admin/homepage
  /admin/about
  /admin/blog
  /admin/gallery
  /admin/references
  /admin/contact
  /admin/seo
  /admin/media

Zorunlu düzeltmeler:
- Sidebar’daki tüm menüler gerçekten çalışan route olsun
- Genel Ayarlar formu kaydedebilsin
- Hizmetler ekranında yeni hizmet ekleme, düzenleme, aktif/pasif yapma çalışsın
- Form Başvuruları ekranında kayıtlar listelensin, detay görüntülensin, okundu/okunmadı durumu değiştirilebilsin
- Boş demo ekranı kalmasın
- Supabase’e gerçek CRUD bağlı olsun
- Başarılı kayıt sonrası toast/başarı mesajı göster

2) SİTEYİ KOMPLE YENİDEN TASARLA
Şu an site eski, boş ve zayıf görünüyor. Baştan premium kurumsal görünüm ver.

Yeni tasarım dili:
- çok daha modern
- premium
- şık
- güven veren
- kurumsal ama sıkıcı olmayan
- dikkat çekici
- güçlü tipografi
- dengeli beyaz alan
- büyük ve kaliteli görseller
- modern animasyonlar
- kaliteli hover efektleri
- scroll reveal geçişleri
- section bazlı güçlü kompozisyon

Tasarımda ilham alınacak yön:
- güncel premium kurumsal web siteleri
- modern B2B hizmet siteleri
- ödüllü kurumsal / interactive sitelerdeki temiz header, büyük hero, güçlü CTA ve etkili görsel dil
Ama birebir kopyalama yapma. ADY Grup’a özel tasarla. :contentReference[oaicite:1]{index=1}

3) ANA SAYFA YENİDEN KURGULANSIN
Ana sayfa daha dolu, etkileyici ve satış odaklı olsun.

Zorunlu bölümler:
- premium hero section
- güven veren kısa değer önerisi
- hizmet kartları
- neden ADY Grup?
- sektörler / hizmet verilen alanlar
- referans / güven alanı
- hakkımızda kısa özet
- CTA alanı
- iletişim / teklif alanı
- footer

Hero section:
- güçlü başlık
- net alt açıklama
- 2 CTA:
  1. Teklif Al
  2. Hizmetleri İncele
- arka planda düz renk değil; kaliteli kurumsal görsel, overlay, gradient, soft light, blur, shape veya hafif motion kullan
- premium hissi versin

4) FOTOĞRAFLAR İÇERİĞE UYGUN OLSUN
Her hizmete uygun profesyonel görseller kullan.
Rastgele placeholder koyma.

Hizmetlere göre görsel yönü:
- ADY Danışmanlık → toplantı, raporlama, kurumsal planlama, denetim
- ADY Güvenlik → saha güvenliği, tesis girişi, devriye, kontrol noktası
- ADY Eğitim → seminer, eğitim salonu, uygulamalı eğitim
- ADY İlk Yardım → ilk yardım eğitimi, manken uygulaması, acil müdahale
- ADY Yangın ve Güvenlik Sistemleri → alarm paneli, CCTV, dedektör, teknik servis
- ADY Temizlik → profesyonel ekipman, kurumsal temizlik sahası
- ADY Catering → endüstriyel mutfak, toplu yemek, servis

5) YÖNLENDİRME HATALARINI TAMAMEN DÜZELT
Şu an ana sayfada ve menülerde hâlâ yönlendirme sorunları var. Bunları kökten çöz.

Mutlaka çalışan yap:
- Header menüsü
- Footer linkleri
- Teklif Al butonu
- Hizmetleri İncele butonu
- Hizmet kartlarındaki “Detaylı İncele”
- Hakkımızda linkleri
- İletişim sayfası yönlendirmesi
- Hizmet detay sayfaları

Hizmet detay route’ları:
- /hizmetler/ady-danismanlik
- /hizmetler/ady-guvenlik
- /hizmetler/ady-egitim
- /hizmetler/ady-ilk-yardim
- /hizmetler/ady-yangin-ve-guvenlik-sistemleri
- /hizmetler/ady-temizlik
- /hizmetler/ady-catering

“Detaylı İncele” tıklanınca ilgili sayfa mutlaka açılsın.
Boş href, #, pasif button veya fake click bırakma.

6) TEKLİF AL / BAŞVURU FORMU
Teklif Al ve başvuru formları gerçekten çalışsın.

Zorunlu:
- Form verisi Supabase’e kaydedilsin
- Aynı anda şu adrese e-posta bildirimi gitsin:
  kerembabaoglu1@gmail.com
- Gönderim sonrası kullanıcıya başarı mesajı göster
- Hata varsa anlaşılır hata mesajı ver

Form alanları:
- ad soyad
- e-posta
- telefon
- şirket adı
- hizmet seçimi
- mesaj

7) İÇERİKLERİ DAHA GÜÇLÜ GÖSTER
Mevcut metinleri daha iyi sun:
- icon destekli maddeler
- güçlü başlık hiyerarşisi
- kart yapıları
- highlight alanları
- güven rozetleri
- sayaçlar veya kurumsal güven alanları
- FAQ alanı
- CTA blokları

8) ANİMASYONLAR
Aşırıya kaçmadan kaliteli animasyonlar ekle:
- scroll reveal
- card hover
- button hover
- section transition
- counter animation
- accordion smooth opening
- hero içinde çok hafif motion

9) RESPONSIVE VE PERFORMANS
- mobil görünüm bozulmasın
- tablet ve desktop düzeni dengeli olsun
- görseller optimize olsun
- performans düşmesin
- modern ama hızlı site olsun

ÇIKTI DÜZENİ
Önce:
1. Tespit edilen sorunlar
2. Yeni tasarım yaklaşımı
3. Düzelecek route listesi
4. Düzelecek admin CRUD listesi
Sonra uygulamaya geç.

KABUL KRİTERLERİ
İş bittiğinde:
- admin panelde ekleme/düzenleme/kaydetme çalışmalı
- sidebar menüleri çalışmalı
- ana sayfa premium görünmeli
- site boş görünmemeli
- tüm yönlendirmeler çalışmalı
- tüm Detaylı İncele butonları çalışmalı
- Teklif Al formu çalışmalı
- kerembabaoglu1@gmail.com adresine mail gitmeli
- hizmet detay sayfaları açılmalı
- kaliteli fotoğraflar ve modern animasyonlar eklenmiş olmalı
- proje demo hissi vermemeli, gerçek kurumsal site hissi vermeli