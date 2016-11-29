Rails.application.config.middleware.use OmniAuth::Builder do
  provider :paypal, "AZSXq_zlRoO87ugPUk-dK99qXA8dXGjvqmy8cJem6RCkGmpb0zq2H-GXX_8MnmvemZPp90HoBlPR1rdv", "EFb2l0aer8V1L4dWTu2XbMS7lyFxLAu1xHfYr1PEdQgzVkxvGCHeXBLMx8yiKjure5bp3KJotEH4p3ZL", sandbox: true, scope: "openid profile email address"
end