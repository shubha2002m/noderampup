// src/main.ts
interface User {
    id: number;
    name: string;
    email: string;
  }
  
  const apiService = new ApiService();
  
  async function loadUser() {
    try {
      const user = await apiService.getData<User>('/api/user/1');
      console.log(user.name);
    } catch (err) {
      console.error('Failed to fetch user:', err);
    }
  }
  
  loadUser();
  