module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      register: {
        allowedFields: [
          "firstname",
          "lastname",
          "dateofbirth",
          "phonenumber",
          "addresses",
        ],
      },
    },
  },
});
