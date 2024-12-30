interface Credentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  name: string;
}

// Simulated user database (in a real app, this would be in a backend)
const USERS: Record<string, { password: string; name: string }> = {
  'user@example.com': {
    password: 'password123',
    name: 'Usuário Teste'
  }
};

export class AuthService {
  static async login(credentials: Credentials): Promise<User | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const userRecord = USERS[credentials.email];
    
    if (!userRecord || userRecord.password !== credentials.password) {
      return null;
    }

    return {
      id: btoa(credentials.email), // Simple way to generate consistent IDs
      email: credentials.email,
      name: userRecord.name
    };
  }

  static async register(credentials: Credentials & { name: string }): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if user already exists
    if (USERS[credentials.email]) {
      return null;
    }

    // Add new user
    USERS[credentials.email] = {
      password: credentials.password,
      name: credentials.name
    };

    return {
      id: btoa(credentials.email),
      email: credentials.email,
      name: credentials.name
    };
  }
}