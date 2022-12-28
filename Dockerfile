# Specify node version
FROM node:16 

WORKDIR /app

# COPY DEPENDENCIES
COPY package.json . 

# RUN INSTALL
RUN yarn install --development
CMD ["node", "src/index.tsx"]

# REBUILD STARTS HERE
COPY . .

# EXPOSE PORT
EXPOSE 3000

# RUN CMDS
CMD ["yarn", "start"]
