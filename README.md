# github-s3-action

github actions s3 upload


```yaml
uses: js-lion/github-s3-action@v1.0.0
with:
  region: ${{ secrets.REGION }}
  bucket: ${{ secrets.BUCKET }}
  host: ${{ secrets.SSH_USER }}
  access: ${{ secrets.ACCESS_KEY }}
  secret: ${{ secrets.SECRET_KEY }}
  local: "./filename" # 本地文件路径
  remote: "Upload file address" # 上传后的文件路径
```
