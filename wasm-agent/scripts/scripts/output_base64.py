import numpy as np
import base64

def main():
    a = np.array([0.111111, 0.21111, 1.68838383, -5.3823412], dtype=np.float32)
    print(a)
    b = base64.b64encode(a)
    s = str(b, 'utf-8')
    print(s)
    a_ = np.frombuffer(base64.b64decode(s.encode('utf-8')), np.float32)
    print(a_)

if __name__ == "__main__":
    main()