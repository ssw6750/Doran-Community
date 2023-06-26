module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "basic-yellow": "#ece7e1",
        "basic-gray": "#e3e0d9",
        "basic-gray-second": "#dedbd4",
        "basic-gray-third": "#d5d2cd",
        "basic-gray-4": "#f8f9fb",
        "basic-red": "#ff4654",
        "basic-black": "#111111",
        "basic-black-second": "#101823",
        "basic-white": "#f0f0f0",
      },
      fontSize: {
        sxs: [
          "8px",
          {
            lineHeight: "12px",
          },
        ],
      },
      fontFamily: {
        ptBlack: ["Pretendard-Black"],
      },
      maxWidth: {
        "post-name": "80px",
      },
      // borderColor: {
      //   "basic-yello": "#ece7e1",
      //   "basic-gray": "#e3e0d9",
      //   "basic-gray-second": "#dedbd4",
      //   "basic-red": "#ff4654",
      //   "basic-black": "#111111",
      //   "basic-black-second": "#101823",
      //   "basic-white": "#f0f0f0",
      // },
    },
  },
  plugins: [],
};
