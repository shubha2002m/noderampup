// src/apiService.ts
// class ApiService {
//     getData() {
//       return fetch('/api/data')
//         .then(response => response.json());
//     }
//   }
  

// src/apiService.ts
class ApiService {
    async getData<T>(url: string): Promise<T> {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data: T = await response.json();
      return data;
    }
  }
  