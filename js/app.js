document.addEventListener('alpine:init', () => {
  Alpine.data('flameApp', () => ({
    activeTab: 'apps',
    isDark: true,
    newPostText: '',
    storageName: '',
    storageUrl: '',
    toast: { visible: false, title: '', message: '' },
    
    // Geliştirici ve Özel Hesap Varsayılanı
    user: {
      email: 'mustafamirac000@gmail.com',
      name: 'Mavi', // Mavi ismi sabit kilitli
      role: 'DEVELOPER',
      photo: 'https://img.icons8.com/fluency/96/fire.png',
      xp: 140,
      level: 1,
      title: 'Acemi'
    },

    posts: [
      { id: 1, author: 'Mavi', role: 'DEVELOPER', text: 'FlameStore mobil web uygulamasına hoş geldiniz! @herkes' }
    ],

    init() {
      this.calculateLevelTitle();
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
      }
    },

    toggleTheme() {
      this.isDark = !this.isDark;
      document.documentElement.classList.toggle('dark', this.isDark);
    },

    triggerToast(title, message) {
      this.toast = { visible: true, title, message };
      setTimeout(() => { this.toast.visible = false; }, 4000);
    },

    calculateLevelTitle() {
      this.user.level = Math.floor(this.user.xp / 200) + 1;
      if (this.user.level >= 40) this.user.title = "YENİLMEZ";
      else if (this.user.level >= 20) this.user.title = "Kral";
      else if (this.user.level >= 10) this.user.title = "Azimli";
      else if (this.user.level >= 5) this.user.title = "Kıdemli";
      else this.user.title = "Acemi";
    },

    submitPost() {
      if (!this.newPostText.trim()) return;
      
      // Mention İçi Popup Tetikleyici
      if (this.newPostText.includes('@')) {
        this.triggerToast("💬 Etiketleme Yapıldı", "İlgili kullanıcıya uygulama içi bildirim gönderildi.");
      }

      this.posts.unshift({
        id: Date.now(),
        author: this.user.name,
        role: this.user.role,
        text: this.newPostText
      });

      // +15 XP Ekleme
      this.user.xp += 15;
      this.calculateLevelTitle();
      this.newPostText = '';
    },

    deletePost(id) {
      this.posts = this.posts.filter(p => p.id !== id);
      this.triggerToast("Silindi", "Gönderi kaldırıldı.");
    },

    saveStorageLink() {
      if (!this.storageName || !this.storageUrl) return;
      this.triggerToast("Başarılı", `${this.storageName} depolama bağlantınız kaydedildi.`);
      this.storageName = '';
      this.storageUrl = '';
    }
  }));
});
