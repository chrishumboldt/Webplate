java -jar compiler.jar --language_in ECMASCRIPT5 --externs ../demo/build/index.js --compilation_level ADVANCED_OPTIMIZATIONS --js ../fallback.js --js_output_file tmp.js && \
head -1 ../fallback.js > ../fallback.min.js && \
cat tmp.js >> ../fallback.min.js && \
rm tmp.js;