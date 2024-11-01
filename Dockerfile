# install / build
FROM node:20.17 AS install_and_build

WORKDIR /build

# install stage
COPY package-lock.json package-lock.json
COPY package.json package.json
RUN npm i

# build stage
COPY app app
COPY assets assets
COPY components components
COPY types types
COPY utils utils
COPY wrappers wrappers
COPY .eslintrc.json .eslintrc.json
COPY postcss.config.mjs postcss.config.mjs
COPY tailwind.config.ts tailwind.config.ts
COPY tsconfig.json tsconfig.json
COPY next.config.mjs next.config.mjs

# need these variables to build
ARG BASE_API_URL
ARG NEXT_PUBLIC_BASE_URL 
ENV BASE_API_URL=${BASE_API_URL}
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
RUN npm run build

FROM node:20.17 AS prod

WORKDIR /app

# don't need anything besides the production packages and the built code
COPY package-lock.json package-lock.json
COPY package.json package.json
RUN npm i --omit=dev
COPY --from=install_and_build /build/.next  /app/.next

# we need these variables here too!
ARG BASE_API_URL
ARG NEXT_PUBLIC_BASE_URL 
ENV BASE_API_URL=${BASE_API_URL}
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}

# run
EXPOSE 3000
CMD ["npm", "start"]