# My-curriculum-vitae app

My-curriculum-vitae is an application that helps you show your resume information online. With this application, you can display your contact information, work experience, education, skills and portfolio. A contact form is also provided which can help any recruiter to contact you easily.

An administration area located in the url `/login` is where you should go to add all your informations that will be displayed on your resume.

To use this app, you need to use [my-curriculum-vitae](https://github.com/SHergibo/my-curriculum-vitae-api.git) REST api at the same time. Without it you will not be able to add, update, delete or view your resume informations.

My-curriculum-vitae is a project bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Requirements

- [npm v8.1.0+](https://www.npmjs.com/package/npm)

## Getting Started

#### 1) Clone the repo

```bash
git clone https://github.com/SHergibo/my-curriculum-vitae.git
cd my-curriculum-vitae
rm -rf .git
```

#### 2) Add your environments data

Rename `.env.development-sample.local` and `.env.production-sample.local` to `.env.development.local` and `.env.production.local`.

In these files, you need to add the `REACT_APP_API_DOMAIN` that you will use to call your API when using the app in development or production mode.

#### 3) Install dependencies

```bash
npm install
```

#### 4) Running the app

- Locally

```bash
npm start
```

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

- In production

```bash
npm build
```

Builds the app for production to the `build` folder.<br />

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## License

[MIT License](README.md) - [Sacha Hergibo](https://github.com/SHergibo)
