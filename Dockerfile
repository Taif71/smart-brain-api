# DOcker username: taifdev
# pass: Zanpakto7114


FROM node:stretch

WORKDIR /usr/src/smart-brain-api

COPY ./ ./

RUN npm install


CMD ["/bin/bash"]