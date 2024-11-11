# github-s3-action

github actions s3 upload


```yaml
uses: js-lion/github-s3-action@v1.1.0
with:
  region: ${{ secrets.REGION }}      # region
  bucket: ${{ secrets.BUCKET }}      # bucket
  host: "account host"               # endpoint / cloudflare r2: https://${{ secrets.R2_ACCOUNT_ID }}.r2.cloudflarestorage.com
  access: ${{ secrets.ACCESS_KEY }}  # accessKeyId
  secret: ${{ secrets.SECRET_KEY }}  # secretAccessKey
  local: "./filename" # 本地文件路径
  remote: "Upload file address"      # 上传后的文件路径
```
