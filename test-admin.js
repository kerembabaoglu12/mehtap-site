async function testAdmin() {
  const baseUrl = 'https://adygrup.com.tr';

  try {
    // Login
    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'Adymehtap1.' }),
    });

    const setCookie = res.headers.get('set-cookie');
    console.log('Login status:', res.status);
    console.log('Login cookie:', setCookie);

    if (!setCookie || res.status !== 200) {
      console.log('Login failed!');
      return;
    }

    // Fetch admin panel
    const adminRes = await fetch(`${baseUrl}/admin`, {
      headers: { 'Cookie': setCookie }
    });
    console.log('Admin panel status:', adminRes.status);

    // Test services API
    const servRes = await fetch(`${baseUrl}/admin/services`, {
      headers: { 'Cookie': setCookie }
    });
    console.log('Services API status:', servRes.status);

    if (servRes.ok) {
      const data = await servRes.json();
      console.log('Services data:', data);
    }

    // Test homepage (public)
    const homeRes = await fetch(`${baseUrl}/`);
    console.log('Homepage status:', homeRes.status);
    console.log('Homepage OK:', homeRes.ok);

  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testAdmin();