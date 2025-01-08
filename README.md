### Miro Clone (Hobby Project)

Step 1: Create NextJS Application

```npm
npx create-next-app@latest
```

Step 2: Initialize it with ShadCn UI

```npm
npx shadcn-ui@latest init
```

Step 3: Initialize it with Convex

```npm
npx convex dev
```

This will ask you to first authenticate using github after that it will create a project ( for backend ) and run the project in your terminal.

Step 4: Run Your Project

```npm
npm run dev
```

Step 5: Setup Clerk Authentication (Email must be selected so to invite people to the Organization boards)
( You need to update the Clerk for Deployed and Development Application separatly)

Step 6: Install Package for clerk

```npm
npm install @clerk/nextjs
```

Step 7: Create a JWT template on clerk dashboard.
( it is required to get proper user info )
