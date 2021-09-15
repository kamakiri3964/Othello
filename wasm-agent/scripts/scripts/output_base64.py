import numpy as np
import base64

def main():
    a = np.array([100.0, -50.0, 40.0, 5.0, -90.0, -10.0, -5.0, -2.0, -2.0, 1], dtype=np.float32)
    print(a)
    b = base64.b64encode(a)
    s = str(b, 'utf-8')
    print(s)
    a_ = np.frombuffer(base64.b64decode(s.encode('utf-8')), np.float32)
    print(a_)

if __name__ == "__main__":
    main()