#! /usr/bin/bash
echo "Pothole Detector Cronjob Running!" >> /home/shiro/logs/pothole-detector.logs
date >> /home/shiro/logs/pothole-detector.logs
node /home/shiro/projects/pucmm/pothole-project/pothole-detector-api/api/cronjob.js >> /home/shiro/logs/pothole-detector.logs
