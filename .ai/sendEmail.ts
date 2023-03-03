const test = async () => {
  try {
    const send = await sendEmail(
      "test@test.com",
      "Test",
      "Test",
      "<h1>Test</h1>"
    );
    console.log(send);
  } catch (error) {
    console.log(error);
  }
};

// test();